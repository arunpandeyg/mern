// components/ProductList.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import ProductCard from './ProductCard';


type Product = {
  _id: string;
  name: string;
  image: string;
  description: string;
  category?: string;
};

export default function ProductList({ initialCategory = 'allproduct' }: { readonly initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(4); // desktop default
  const observerRef = useRef<HTMLDivElement | null>(null);

  // adapt limit to screen size (1 on small screens, 4 on large)
  useEffect(() => {
    function setBySize() {
      const width = window.innerWidth;
      setLimit(width < 640 ? 1 : 4);
    }
    setBySize();
    window.addEventListener('resize', setBySize);
    return () => window.removeEventListener('resize', setBySize);
  }, []);

  // If parent uses key=category to remount, this ensures initialCategory sets state.
  useEffect(() => {
    setCategory(initialCategory);
  }, [initialCategory]);

  // reset when category or limit changes
  useEffect(() => {
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [category, limit]);

  // fetch products (with robust checks)
  useEffect(() => {
    let ignore = false;

    async function load() {
      if (loading || !hasMore) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${encodeURIComponent(category)}&page=${page}&limit=${limit}`);
        if (!res.ok) {
          const text = await res.text().catch(() => '<no body>');
          console.error('Failed fetching products:', res.status, res.statusText, text);
          setHasMore(false);
          return;
        }

        const json = await res.json();
        if (!json || !Array.isArray(json.products)) {
          console.error('Unexpected products payload:', json);
          setHasMore(false);
          return;
        }

        if (page === 1) setProducts(json.products);
        else setProducts((prev) => [...prev, ...json.products]);

        const loadedCount = (page - 1) * limit + (json.products?.length || 0);
        setHasMore(loadedCount < (json.total ?? 0));
      } catch (err) {
        console.error('Error loading products:', err);
        setHasMore(false);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, [category, page, limit]);

  // infinite scroll observer for small screens (limit === 1)
  useEffect(() => {
    if (limit > 1) return; // desktop uses manual pagination
    const el = observerRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loading) {
            setPage((p) => p + 1);
          }
        });
      },
      { rootMargin: '200px' }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [observerRef.current, hasMore, loading, limit]);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>

      <div ref={observerRef} />

      {limit > 1 ? (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} className="px-3 py-1 rounded border" disabled={page === 1}>
            Prev
          </button>
          <div className="px-3 py-1">Page {page}</div>
          <button onClick={() => setPage((p) => p + 1)} className="px-3 py-1 rounded border" disabled={!hasMore}>
            Next
          </button>
        </div>
      ) : (
        <div className="text-center mt-6 text-sm text-gray-500">{loading ? 'Loading more...' : hasMore ? '' : 'No more products'}</div>
      )}
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { fetchProducts } from "@/reduxtk/ProductSlice";
import { addItem, removeItem } from "@/reduxtk/Slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  const products = useSelector((state) => state.products.products);
  console.log("Products in Home:", products);

  const cartSelector = useSelector((state) => state.cart.items);
  console.log(cartSelector);
  return (
    <div className="w-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-center mt-4">
        Welcome to the RTK Practice Home Page
      </h2>

      <div className="grid grid-cols-4 gap-4 p-4 ">
        {products.length > 0 &&
          products.map((product) => (
            <Card
              key={product.id}
              className="border p-4 m-4 bg-white text-black w-70 h-85 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg shadow-lg transform-3d hover:scale-105 transition duration-300 ease-in-out"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-40 h-50 mx-auto"
              />
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <p className="text-gray-600">Price ₹: {product.price}</p>
              {cartSelector.find((item) => item.id === product.id) ? (
                <Button
                  onClick={() => dispatch(removeItem(product))}
                  className="disabled bg-orange-200 hover:bg-orange-300 mb-4"
                >
                  Remove From Cart
                </Button>
              ) : (
                <Button
                  onClick={() => dispatch(addItem(product))}
                  className="bg-orange-600 hover:bg-orange-700 mb-4"
                >
                  Add To Cart
                </Button>
              )}
            </Card>
          ))}
      </div>
    </div>
  );
};

export default ProductList;

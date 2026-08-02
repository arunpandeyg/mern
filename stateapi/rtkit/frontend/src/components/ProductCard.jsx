import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addItem, removeItem } from "@/reduxtk/Slice";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/reduxtk/ProductSlice";

const ProductCard = () => {
  const [product, setProduct] = React.useState({});
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(fetchProducts());
      }, []);
      const products = useSelector((state) => state.products.products);
      console.log("Products in Home:", products);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <Card className="border p-4 m-4 bg-white text-black w-70 h-85 flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg shadow-lg transform-3d hover:scale-105 transition duration-300 ease-in-out">
        <img src={product.thumbnail} alt={product.title} className="w-40 h-50 mx-auto" />
                  <h3 className="text-xl font-semibold">{product.title}</h3>
                  <p className="text-gray-600">Price ₹: {product.price}</p>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => dispatch(addItem(1))}
            className="bg-orange-600 hover:bg-orange-700"
          >
            + Items
          </Button>
          <Button
            onClick={() => dispatch(removeItem(1))}
            className="bg-orange-600 hover:bg-orange-700"
          >
            - Items
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ProductCard;

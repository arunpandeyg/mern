import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clearAllItem, removeItem } from "@/reduxtk/Slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner"

const SelectedProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartSelector = useSelector((state) => state.cart.items);
  console.log("Selected Products:", cartSelector);
  const [cartItems, setCartItems] = React.useState(cartSelector);

  useEffect(() => {
    setCartItems(cartSelector);
  }, [cartSelector]);

  const handleCartItemsChange = (productId, newQuantity) => {
    let quantity = parseInt(newQuantity) > 1 ? parseInt(newQuantity) : 1;

    const cartTempItems = cartSelector.map((item) => {
      return item.id === productId ? { ...item, cartItems: quantity } : item;
    });
    console.log("Updated Cart Items:", cartTempItems[0]);
    setCartItems(cartTempItems);
    // localStorage.setCartItems("cartItems", JSON.stringify(cartTempItems));
  };

  const handlePlaceOrder = () => {
    localStorage.clear();
    dispatch(clearAllItem());
    alert("Order Placed Successfully!");
    toast("Order Placed Successfully!");
    navigate("/");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <h2 className="text-xl font-bold mb-4">Selected Products</h2>
          <span className="text-xl font-bold">{cartItems.length} Products</span>
        </div>
        <span className="text-xl font-bold">
          Total Price: ₹
          {cartItems
            .reduce(
              (total, product) =>
                product.cartItems
                  ? total + product.price * product.cartItems
                  : total + product.price,
              0
            )
            .toFixed(2)}
        </span>
        <Button onClick={handlePlaceOrder} className="bg-purple-300 hover:bg-purple-500 text-xl font-bold">
          Place Order
        </Button>
      </div>
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-4 gap-4 ">
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded-lg shadow-lg transform-3d hover:scale-105 transition duration-300 ease-in-out  text-center"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <div className="my-2 flex items-center justify-between ">
                <p className="text-gray-600">
                  Price: ₹
                  {(product.cartItems
                    ? product.price * product.cartItems
                    : product.price
                  ).toFixed(2)}
                </p>
                <Input
                  onChange={(e) =>
                    handleCartItemsChange(product.id, e.target.value)
                  }
                  value={product.cartItems ? product.cartItems : 1}
                  type="number"
                  className={"w-15"}
                />
              </div>

              <Button
                onClick={() => dispatch(removeItem(product))}
                className="bg-orange-600 hover:bg-orange-700 mt-2"
              >
                Remove Items
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products selected.</p>
      )}      
    </div>
  );
};

export default SelectedProducts;

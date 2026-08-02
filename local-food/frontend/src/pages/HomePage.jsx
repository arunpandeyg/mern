import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";
import { Link } from "react-router";

const HomePage = () => {
  const isClicked = false;
  const Food = [
    { id: 1, name: "Roti", category: "Food", image: "/roti.png" },
    { id: 2, name: "Daal", category: "Vegetable", image: "/daal.png" },
    { id: 3, name: "Sabji", category: "Vegetable", image: "/sabji1.png" },
    { id: 4, name: "Chaval", category: "Food", image: "/chaval.png" },
  ]; // Placeholder for food items

  const [isPickedUp, setIsPickedUp] = React.useState(false);

  const handleClick = () => {
    console.log("Button clicked");
    setIsPickedUp(!isPickedUp);
  };

  return (
    <div className="w-full min-h-[476px]">
      <h1 className="text-2xl font-bold text-center text-orange-600">
        Welcome Food Ready to Pick Up
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Food.map((item) => (
          <div key={item.id}>
            <Card className="m-4 p-4 border rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold text-orange-600">{item.name}</h2>
              <img
                src={item.image}
                alt={item.name}
                className="w-200 h-40 object-cover rounded-md mb-4"
              />
              <p className="text-xl font-bold text-orange-600">
                Category: {item.category}
              </p>
              <Button

                className="text-xl font-bold bg-orange-700 hover:bg-orange-400"
                onClick={(e) => handleClick(e.target.value)}
              >
                {isPickedUp ? "Picked Up" : "Pick Up"}
              </Button>
            </Card>
          </div>
        ))}
      </div>
      <h2 className="text-center font-bold">
        <Link to="/next" className="text-orange-600">
          Prev
        </Link>{" "}
        Page 1 of 100{" "}
        <Link to="/next" className="text-orange-600">
          Next
        </Link>
      </h2>
    </div>
  );
};

export default HomePage;

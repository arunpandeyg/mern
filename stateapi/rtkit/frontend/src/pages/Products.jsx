import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { addItem, removeItem } from "@/reduxtk/Slice";
import React from "react";
import { useDispatch } from "react-redux";

const Products = () => {
  const dispatch = useDispatch();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      
      <Card className=" text-center justify-center w-70 h-100 p-4">
        <h2 className="text-2xl font-bold text-center">Wealth</h2>

        <img src="/r2.png" alt="ppp" className="w-40 h-50 mx-auto" />
        <p className="text-sm text-justify">
          Wealth is a state of mind that is characterized by a sense of
          self-worth, self-esteem, and self-respect.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => dispatch(addItem(1))}
            className="bg-orange-600 hover:bg-orange-700"
          >
            + Items
          </Button>
          <Button
            onClick={() => dispatch(removeItem(-1))}
            className="bg-orange-600 hover:bg-orange-700"
          >
            - Items
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Products;

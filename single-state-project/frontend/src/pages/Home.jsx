import React from "react";
import { Link } from "react-router";
import { toast } from "react-hot-toast";
import { Button } from "../components/ui/button";

const Home = () => {
  return (
    <div className="bg-gray-300/15 text-gray-700 text-center w-full h-120 ">
      <p className="pt-20 text-2xl">
        I met a traveler from an antique land,
        <br />
        Who said—“Two vast and trunk less <br /> 
        legs of stoner Stand in the
        desert. . . .Near them,
        <br /> 
        on the sand, Half sunk a shattered visage lies, 
        whose frown,
      </p>
      <div className="flex justify-center gap-5 mt-5 text-xl">
        {" "}
        <Link to="/home">Home</Link>
        <Link to="/users">Users</Link>
        <Link to="/context/context">Context</Link>
        <Link to="/localstorage/local">Local Storage</Link>
        <Link to="/rtk/rtk">RTK</Link>
        <Link to="/rtkq/signin">RTKQ</Link>
        <Link to="/zustand/zustand">Zustand</Link>
        <Button onClick={() => toast.success("Hello World")}>Click Me</Button>
      </div>
    </div>
  );
};

export default Home;

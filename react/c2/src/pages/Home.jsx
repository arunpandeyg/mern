import React from "react";
import Card from "../components/Card";

function Home() {
  return (
    <div className="flex gap-50 items-center justify-center h-[472px]  bg-gray-100">      
      <div>
        <Card />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to the Home Page</h2>
        <p className="text-lg text-gray-700">This is the main content area.</p>
      </div>

    </div>
  );
}

export default Home;

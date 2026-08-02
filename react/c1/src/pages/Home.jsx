import React from "react";
import Missile from "../components/Missile";

function Home() {
  return (
    <div className="flex  items-center justify-center h-[472px] gap-10 bg-gray-100">
      <div>
        <h2 className="text-4xl font-bold mb-4">Welcome to the Home Page</h2>
        <p className="text-lg text-gray-700">This is the main content area.</p>
      </div>

      <div>
        <Missile />
      </div>
    </div>
  );
}

export default Home;

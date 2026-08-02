import React from "react";



function ShowMissiles() {
  return (
    <div className="flex flex-col items-center justify-center h-[470px] bg-gray-100">
      <h2 className="text-4xl font-bold mb-4 text-center">BrahMos</h2>
      <img
        src="/brahmos.png"
        alt="BrahMos"
        height={300}
        width={300}
        className="mx-auto rounded-xl shadow-lg hover:shadow-3xl transition-transform transition-all-duration-300"
      />
      <p className="text-center text-gray-600 text-xl">
        Information about missiles will be displayed here.
      </p>
    </div>
  );
}

export default ShowMissiles;

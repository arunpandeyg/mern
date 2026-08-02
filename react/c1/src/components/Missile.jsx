import React from "react";
import { Link } from "react-router";

function Missile() {
  return (
    <div>
      <h2 className="text-4xl font-bold mb-4 text-center">Missiles</h2>
      <Link to="/missiles">
        <img
          src="/brahmos.png"
          alt="Missiles"
          height={200}
          width={200}
          className="mx-auto rounded-xl shadow-lg hover:shadow-3xl transition-transform transition-all-duration-300"
        />
      </Link>
      <p className="text-center text-gray-600 text-xl">
        Information about missiles will be displayed here.
      </p>
    </div>
  );
}

export default Missile;

import React from "react";

function Button() {
  return (
    <button
      onClick={'/signin'}
      className="button px-4 py- bg-blue-500 text-white font-bold rounded hover:bg-green-600 "
    >
       <span className="animate-bounce ">&larr; &rarr;</span>
    </button>
  );
}

export default Button;

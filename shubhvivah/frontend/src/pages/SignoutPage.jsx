import React from "react";

const SignoutPage = () => {
  return (
    <div className=" items-center h-[470px]">
      <div>
        <h1 className="text-2xl font-bold">Signed Out </h1>
        <form>
          <div className="flex flex-col items-center justify-center ">
            <button
              type="submit"
              className="bg-orange-500 text-white p-2 rounded w-64 hover:bg-orange-600 transition duration-200"
            >
              Sign Out
            </button>
          </div>
        </form>
        <div>
          <p className="text-lg mt-4">You have successfully signed out.</p>
          <p className="text-lg mt-4">Thank you for using our service!</p>
        </div>
      </div>
    </div>
  );
};

export default SignoutPage;

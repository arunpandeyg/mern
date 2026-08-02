import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className=" my-3 flex justify-center items-center flex-col gap-5">
      <img src={assets.hero} alt="" className="w-[90%] h-[70vh] rounded-lg shadow-md hover:transform duration-300 hover:scale-105" />
    </div>
  );
};
export default Hero;

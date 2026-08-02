import Footer from "@/rtk/Footer";
import Header from "@/rtk/Header";
import { Outlet } from "react-router";


const RtkLayout = () => {
    return <>
    <Header />
    <Outlet />
    <Footer />
    </>
};

export default RtkLayout
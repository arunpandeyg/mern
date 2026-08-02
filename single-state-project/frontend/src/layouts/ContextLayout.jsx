import Footer from "@/context/Footer";
import Header from "@/context/Header";
import { Outlet } from "react-router";


const ContextLayout = () => {
    return <>
    <Header />
    <Outlet />
    <Footer />
    </>
};

export default ContextLayout;
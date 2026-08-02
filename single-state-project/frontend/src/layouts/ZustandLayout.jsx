import Footer from "@/zuxtand/Footer";
import Header from "@/zuxtand/Header";
import { Outlet } from "react-router";


const ZustandLayout = () => {
    return <>
    <Header />
    <Outlet />
    <Footer />
    </>
};

export default ZustandLayout
import Footer from "@/rtkq/Footer";
import Header from "@/rtkq/Header";
import { Outlet } from "react-router";


const RtkqLayout = () => {
    return <>
    <Header />
    <Outlet />
    <Footer />
    </>
};

export default RtkqLayout
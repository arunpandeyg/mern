import Footer from "@/local-storage/Footer";
import Header from "@/local-storage/Header";
import { Outlet } from "react-router";


const LocalStorageLayout = () => {
    return <>
    <Header />
    <Outlet />
    <Footer />
    </>
};

export default LocalStorageLayout
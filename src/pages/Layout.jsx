import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import Navbar from "../components/Navbar"; // Import sin llaves porque es export default
import { Footer } from "../components/Footer"; // Import con llaves porque es export nombrado

// Base component that maintains the navbar and footer throughout the page
// and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <Navbar />
            <Outlet />
            <Footer />
        </ScrollToTop>
    );
};

import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Generate from "./pages/Generate";
import MyGeneration from "./pages/MyGeneration";
import YtPreview from "./pages/YtPreview";
import About from "./pages/About";
import Login from "./components/Login";
import { useEffect } from "react";
import {Toaster} from 'react-hot-toast';
export default function App() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Small delay to ensure the page has rendered
            setTimeout(() => {
                const element = document.getElementById(hash.slice(1));
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        } else {
            window.scrollTo(0, 0);
        }
    }, [pathname, hash]);

    return (
        <>
            <Toaster/>
            <Navbar />
            <LenisScroll />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/generate/:id" element={<Generate />} />
                <Route path="/my-generation" element={<MyGeneration />} />
                <Route path="/preview" element={<YtPreview />} />
                <Route path="/login" element={<Login />} />
            </Routes>
            <Footer />
        </>
    );
}
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import HomePage from "./pages/Home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";
import AboutPage from "./pages/About/AboutPage";
import ServicePage from "./pages/Service/ServicePage";
import GalleryPage from "./pages/Gallery/GalleryPage";

import ScrollToTop from "./components/common/Scrollpage";
import ProfilePage from "./pages/usersProfilePage";


import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import RoomPage from "./pages/Rooms/RoomsPage";



export default function App() {
  return (
    <>
    <ScrollToTop/>
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          
          
          
          <Route path="/userprofile" element={<ProfilePage />} />
          <Route path="/rooms" element={<RoomPage />} />


        </Routes>
      </main>

      <Footer />
    </>
  );
}

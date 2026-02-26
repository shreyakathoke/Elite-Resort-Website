import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import HomePage from "./pages/Home/HomePage";
import ContactPage from "./pages/Contact/ContactPage";
import AboutPage from "./pages/About/AboutPage";
import ServicePage from "./pages/Service/ServicePage";
import GalleryPage from "./pages/Gallery/GalleryPage";
import RoomPage from "./pages/Rooms/RoomsPage";

import ScrollToTop from "./components/common/Scrollpage";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

import UserProfile from "./pages/users/UserProfile.jsx";
import BookingPage from "./pages/Booking/BookingPage";

import PaymentPage from "./pages/Payment/PaymentPage";


export default function App() {
  return (
    <>
      <ScrollToTop />
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/rooms" element={<RoomPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ✅ User Profile Route */}
          <Route path="/user-profile" element={<UserProfile />} />

          <Route path="/booking/:roomId" element={<BookingPage />} />
          <Route path="/payment/:bookingId" element={<PaymentPage />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
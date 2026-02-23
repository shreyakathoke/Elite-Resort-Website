import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../styles/rooms.css";

import room1 from "../../assets/room1.jpg";
import room2 from "../../assets/g6.jpg";
import secondroom from "../../assets/g14.jpg"; // ✅ fixed extension
import thirdroom from "../../assets/g3.jpg";
import room5 from "../../assets/g4.jpg";
import room6 from "../../assets/g6.jpg";

const rooms = [
  {
    id: 1,
    title: "Deluxe Room",
    desc: "Spacious luxury room with private balcony and premium interiors.",
    img: room1,
    theme: "glass",
  },
  {
    id: 2,
    title: "Double Suite",
    desc: "Elegant suite perfect for couples with ocean view amenities.",
    img: room2,
    theme: "dark",
  },
  {
    id: 3,
    title: "Single Room",
    desc: "Comfortable single stay with stylish décor and cozy atmosphere.",
    img: secondroom,
    theme: "glass",
  },
  {
    id: 4,
    title: "Executive Suite",
    desc: "Premium executive suite featuring lounge space and luxury bath.",
    img: thirdroom,
    theme: "dark",
  },
  {
    id: 5,
    title: "Family Room",
    desc: "Spacious family accommodation with relaxing ambiance.",
    img: room5,
    theme: "glass",
  },
  {
    id: 6,
    title: "Presidential Suite",
    desc: "Ultimate luxury experience with panoramic views.",
    img: room6,
    theme: "dark",
  },
];

export default function RoomsSection() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <section className="rooms-sec">
      <div className="container py-5">
        <div className="text-center mb-5">
          <h2 className="section-title">Our Luxury Rooms</h2>
          <p className="section-subtitle">
            Discover comfort, elegance, and unforgettable experiences.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="col-12 col-md-6 col-lg-4"
              data-aos="fade-up"
              data-aos-delay={index * 120}
            >
              <article className={`room-card ${room.theme}`}>
                <div
                  className="room-img"
                  style={{ backgroundImage: `url(${room.img})` }}
                  role="img"
                  aria-label={room.title}
                />

                <div className="room-overlay">
                  <div className="room-line" />
                  <h3 className="room-title">{room.title}</h3>
                  <p className="room-desc">{room.desc}</p>

                  <button className="room-btn" type="button">
                    Book Room
                  </button>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

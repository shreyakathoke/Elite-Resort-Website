import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../styles/roomListPage.css";

// ✅ Use your real images from src/assets
import room1 from "../../assets/room1.jpg";
import g3 from "../../assets/g3.jpg";
import g4 from "../../assets/g4.jpg";
import g6 from "../../assets/g6.jpg";
import g14 from "../../assets/g14.jpg";
import pool from "../../assets/g13.jpg";

const ROOMS = [
  {
    id: 1,
    roomNo: "101",
    roomType: "Deluxe",
    pricePerNight: 3499,
    capacityGuests: 2,
    availability: "Available",
    description:
      "Spacious luxury room with balcony, premium interiors, and a calm ambience.",
    cover: room1,
    images: [room1, g3, g4, g6],
    rating: 4.7,
    badge: "Most Popular",
    features: ["Balcony", "Wi-Fi", "Breakfast", "AC"],
  },
  {
    id: 2,
    roomNo: "202",
    roomType: "Suite",
    pricePerNight: 5299,
    capacityGuests: 3,
    availability: "Available",
    description:
      "Elegant suite for couples with premium comfort and a breathtaking view.",
    cover: g6,
    images: [g6, pool, g14, g3],
    rating: 4.8,
    badge: "Ocean View",
    features: ["King Bed", "View", "Room Service", "Wi-Fi"],
  },
  {
    id: 3,
    roomNo: "110",
    roomType: "Single",
    pricePerNight: 2499,
    capacityGuests: 1,
    availability: "Unavailable",
    description:
      "Modern single room designed for solo travelers with work desk comfort.",
    cover: g14,
    images: [g14, g4, g6],
    rating: 4.5,
    badge: "Cozy Stay",
    features: ["Work Desk", "Smart TV", "Wi-Fi", "AC"],
  },
  {
    id: 4,
    roomNo: "305",
    roomType: "Suite",
    pricePerNight: 6999,
    capacityGuests: 4,
    availability: "Available",
    description:
      "Executive comfort with lounge space, luxury bath, and curated hospitality.",
    cover: pool,
    images: [pool, g6, g3, g14],
    rating: 4.9,
    badge: "Premium",
    features: ["Lounge", "Bathtub", "Breakfast", "Wi-Fi"],
  },
  {
    id: 5,
    roomNo: "410",
    roomType: "Family",
    pricePerNight: 5899,
    capacityGuests: 4,
    availability: "Available",
    description:
      "Spacious family stay with two beds and relaxing ambience for everyone.",
    cover: g4,
    images: [g4, room1, g14],
    rating: 4.6,
    badge: "Family Choice",
    features: ["2 Beds", "Breakfast", "Wi-Fi", "AC"],
  },
  {
    id: 6,
    roomNo: "501",
    roomType: "Luxury",
    pricePerNight: 12999,
    capacityGuests: 5,
    availability: "Available",
    description:
      "Ultimate luxury with panoramic views and personalized premium service.",
    cover: g3,
    images: [g3, pool, g6, g4],
    rating: 5.0,
    badge: "Luxury",
    features: ["Panoramic View", "Butler", "Premium Bath", "Wi-Fi"],
  },
];

const FILTERS = ["All", "Deluxe", "Suite", "Single", "Family", "Luxury"];

const formatINR = (n) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export default function RoomsList() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  const filteredRooms = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ROOMS.filter((r) => {
      const filterOk = activeFilter === "All" ? true : r.roomType === activeFilter;

      const queryOk = !q
        ? true
        : (
            r.roomNo +
            " " +
            r.roomType +
            " " +
            r.badge +
            " " +
            r.availability
          )
            .toLowerCase()
            .includes(q);

      return filterOk && queryOk;
    });
  }, [query, activeFilter]);

  const openRoom = (room) => setActiveRoom(room);
  const closeRoom = () => setActiveRoom(null);

  // ✅ BOOKING -> If NOT logged in => /login, else => /rooms-gallery (or booking page)
  const handleBooking = (room) => {
    const token = localStorage.getItem("token"); // ✅ token key

    if (!token) {
      // ✅ Go to login page if not logged in
      navigate("/login", {
        state: { from: "/rooms", roomId: room.id }, // optional redirect data
      });
      return;
    }

    // ✅ Logged in -> continue booking
    navigate("/rooms-gallery");
    // OR: navigate(`/booking/${room.id}`);
  };

  return (
    <main className="rl-page">
      {/* HERO */}
      <section className="rl-hero">
        <div className="rl-hero-overlay" />
        <div className="container rl-hero-inner text-center">
          <div className="rl-hero-box" data-aos="zoom-in">
            <div className="rl-line" />
            <h1 className="rl-title">Room List</h1>
            <p className="rl-subtitle">
              Browse our rooms — room number, type, price, capacity and availability.
            </p>

            {/* Search */}
            <div className="input-group rl-search mt-4">
              <span className="input-group-text rl-ic">
                <i className="bi bi-search" />
              </span>
              <input
                className="form-control rl-search-input"
                placeholder="Search (room no, type, availability...)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* Filters */}
            <div className="rl-filters mt-3">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className={`rl-chip ${activeFilter === f ? "active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LIST */}
      <section className="rl-body">
        <div className="container py-5">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <div className="rl-count">
              Showing <span>{filteredRooms.length}</span> room
              {filteredRooms.length !== 1 ? "s" : ""}
            </div>
            <div className="rl-note">
              <i className="bi bi-info-circle" /> Click <b>View Details</b> to see preview.
            </div>
          </div>

          {filteredRooms.length === 0 ? (
            <div className="rl-empty text-center p-5">
              <div className="rl-empty-ic mb-2">
                <i className="bi bi-emoji-frown" />
              </div>
              <h4>No rooms found</h4>
              <p className="mb-0">Try another keyword or filter.</p>
            </div>
          ) : (
            <div className="row g-4">
              {filteredRooms.map((room, idx) => (
                <div
                  key={room.id}
                  className="col-12 col-md-6 col-lg-4"
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                >
                  <article className="rl-card h-100">
                    <div className="rl-media">
                      <img className="rl-img" src={room.cover} alt={room.roomType} />
                      <div className="rl-badge">{room.badge}</div>

                      <div className={`rl-avail ${room.availability === "Available" ? "ok" : "no"}`}>
                        {room.availability}
                      </div>
                    </div>

                    <div className="rl-card-body">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                          <div className="rl-type">{room.roomType}</div>
                          <h3 className="rl-room-title">
                            Room No: <span>{room.roomNo}</span>
                          </h3>
                        </div>
                        <div className="rl-rating">
                          <i className="bi bi-star-fill" />
                          <span>{room.rating}</span>
                        </div>
                      </div>

                      <div className="rl-fields">
                        <div className="rl-field">
                          <span>Price:</span> <b>{formatINR(room.pricePerNight)}</b>
                          <small>/night</small>
                        </div>
                        <div className="rl-field">
                          <span>Capacity:</span> <b>{room.capacityGuests}</b> <small>guests</small>
                        </div>
                      </div>

                      <p className="rl-desc">{room.description}</p>

                      <div className="rl-features">
                        {room.features.slice(0, 4).map((f) => (
                          <span key={f} className="rl-pill">
                            {f}
                          </span>
                        ))}
                      </div>

                      <div className="rl-footer">
                        <div className="rl-price">
                          {formatINR(room.pricePerNight)} <span>/night</span>
                        </div>

                        <div className="d-flex gap-2">
                          <button
                            type="button"
                            className="btn btn-outline-light rl-btn"
                            onClick={() => openRoom(room)}
                            data-bs-toggle="modal"
                            data-bs-target="#roomDetailsModal"
                          >
                            View Details
                          </button>

                          <button
                            type="button"
                            className="btn btn-primary rl-btn-primary"
                            onClick={() => handleBooking(room)}
                            disabled={room.availability !== "Available"}
                            title={
                              room.availability !== "Available"
                                ? "Room is unavailable"
                                : "Book this room"
                            }
                          >
                            Booking
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL (View Details) */}
      <div
        className="modal fade"
        id="roomDetailsModal"
        tabIndex="-1"
        aria-hidden="true"
        onClick={(e) => {
          if (e.target.classList.contains("modal")) closeRoom();
        }}
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content rl-modal">
            <div className="modal-header rl-modal-head">
              <div>
                <div className="rl-modal-type">
                  {activeRoom?.roomType} • Room {activeRoom?.roomNo}
                </div>
                <h5 className="modal-title rl-modal-title">{activeRoom?.badge}</h5>
              </div>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeRoom}
              />
            </div>

            <div className="modal-body">
              {!activeRoom ? (
                <div className="text-center py-5">Loading...</div>
              ) : (
                <>
                  <div id="rlCarousel" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner rl-carousel-inner">
                      {activeRoom.images.map((img, idx) => (
                        <div key={idx} className={`carousel-item ${idx === 0 ? "active" : ""}`}>
                          <img src={img} className="d-block w-100 rl-carousel-img" alt="" />
                        </div>
                      ))}
                    </div>

                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#rlCarousel"
                      data-bs-slide="prev"
                    >
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#rlCarousel"
                      data-bs-slide="next"
                    >
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>

                  <div className="rl-modal-info mt-3">
                    <div className="d-flex flex-wrap gap-2 mb-2">
                      <span
                        className={`rl-avail-pill ${
                          activeRoom.availability === "Available" ? "ok" : "no"
                        }`}
                      >
                        {activeRoom.availability}
                      </span>
                      <span className="rl-avail-pill dark">
                        Capacity: {activeRoom.capacityGuests} guests
                      </span>
                      <span className="rl-avail-pill dark">
                        Price: {formatINR(activeRoom.pricePerNight)}/night
                      </span>
                    </div>

                    <p className="mb-2">{activeRoom.description}</p>

                    <div className="d-flex flex-wrap gap-2">
                      {activeRoom.features.map((f) => (
                        <span key={f} className="rl-pill rl-pill-strong">
                          {f}
                        </span>
                      ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                      <div className="rl-price rl-price-lg">
                        {formatINR(activeRoom.pricePerNight)} <span>/night</span>
                      </div>

                      <button
                        className="btn btn-primary rl-btn-primary"
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => handleBooking(activeRoom)}
                        disabled={activeRoom.availability !== "Available"}
                      >
                        Book This Room
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../styles/roomListPage.css";

import { getRooms } from "../../api/resortApi";

// ✅ optional fallback images (if backend doesn't provide)
import room1 from "../../assets/room1.jpg";
import g3 from "../../assets/g3.jpg";
import g4 from "../../assets/g4.jpg";
import g6 from "../../assets/g6.jpg";

const FILTERS = ["All", "Deluxe", "Suite", "Standard", "Single", "Family", "Luxury"];

const formatUSD = (n) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(n || 0));

export default function RoomsList() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeRoom, setActiveRoom] = useState(null);

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-out-cubic" });
  }, []);

  // ✅ Fetch rooms from backend
  useEffect(() => {
    let alive = true;

    async function load() {
      try {
        setLoading(true);
        setErr("");

        const res = await getRooms();
        const list = Array.isArray(res?.data) ? res.data : [];

        // ✅ map backend -> UI shape
        const mapped = list.map((r, idx) => ({
          roomId: r.roomId || r._id || r.id, // backend unique id
          roomNumber: r.roomNumber ?? r.roomNo ?? "",
          type: r.type ?? r.roomType ?? "Standard",
          pricePerNight: r.pricePerNight ?? r.price ?? 0,
          capacity: r.capacity ?? r.capacityGuests ?? 1,
          available: typeof r.available === "boolean" ? r.available : true,
          createdAt: r.createdAt,
          updatedAt: r.updatedAt,

          // UI fields
          badge: r.type || "Room",
          rating: 4.6,
          description: "Comfortable stay with premium amenities.",
          cover: [room1, g3, g4, g6][idx % 4],
          images: [room1, g3, g4, g6],
          features: ["Wi-Fi", "AC", "Breakfast", "Room Service"],
        }));

        if (alive) setRooms(mapped);
      } catch (e) {
        const msg =
          e?.response?.data?.message ||
          e?.response?.data?.error ||
          e?.message ||
          "Failed to load rooms";
        if (alive) setErr(msg);
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const filteredRooms = useMemo(() => {
    const q = query.trim().toLowerCase();

    return rooms.filter((r) => {
      const filterOk = activeFilter === "All" ? true : r.type === activeFilter;

      const queryOk = !q
        ? true
        : `${r.roomNumber} ${r.type} ${r.available ? "available" : "unavailable"}`
            .toLowerCase()
            .includes(q);

      return filterOk && queryOk;
    });
  }, [rooms, query, activeFilter]);

  const openRoom = (room) => setActiveRoom(room);
  const closeRoom = () => setActiveRoom(null);

  // ✅ Booking: if NOT logged in -> login, else -> booking page
  const handleBooking = (room) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/rooms", roomId: room.roomId } });
      return;
    }

    // ✅ You can change this to your real booking route
    navigate(`/booking/${room.roomId}`);
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

      {/* BODY */}
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

          {/* ✅ Loading / Error */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" role="status" />
              <div className="mt-2">Loading rooms...</div>
            </div>
          )}

          {!loading && err && (
            <div className="alert alert-danger">
              {err}
              <button
                className="btn btn-sm btn-outline-danger ms-3"
                onClick={() => window.location.reload()}
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !err && filteredRooms.length === 0 ? (
            <div className="rl-empty text-center p-5">
              <div className="rl-empty-ic mb-2">
                <i className="bi bi-emoji-frown" />
              </div>
              <h4>No rooms found</h4>
              <p className="mb-0">Try another keyword or filter.</p>
            </div>
          ) : null}

          {!loading && !err && filteredRooms.length > 0 && (
            <div className="row g-4">
              {filteredRooms.map((room, idx) => (
                <div
                  key={room.roomId}
                  className="col-12 col-md-6 col-lg-4"
                  data-aos="fade-up"
                  data-aos-delay={idx * 80}
                >
                  <article className="rl-card h-100">
                    <div className="rl-media">
                      <img className="rl-img" src={room.cover} alt={room.type} />
                      <div className="rl-badge">{room.type}</div>

                      <div className={`rl-avail ${room.available ? "ok" : "no"}`}>
                        {room.available ? "Available" : "Unavailable"}
                      </div>
                    </div>

                    <div className="rl-card-body">
                      <div className="d-flex justify-content-between align-items-start gap-2">
                        <div>
                          <div className="rl-type">{room.type}</div>
                          <h3 className="rl-room-title">
                            Room No: <span>{room.roomNumber}</span>
                          </h3>
                        </div>
                        <div className="rl-rating">
                          <i className="bi bi-star-fill" />
                          <span>{room.rating}</span>
                        </div>
                      </div>

                      <div className="rl-fields">
                        <div className="rl-field">
                          <span>Price:</span> <b>{formatUSD(room.pricePerNight)}</b>
                          <small>/night</small>
                        </div>
                        <div className="rl-field">
                          <span>Capacity:</span> <b>{room.capacity}</b> <small>guests</small>
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
                          {formatUSD(room.pricePerNight)} <span>/night</span>
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
                            disabled={!room.available}
                            title={!room.available ? "Room is unavailable" : "Book this room"}
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

      {/* MODAL */}
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
                  {activeRoom?.type} • Room {activeRoom?.roomNumber}
                </div>
                <h5 className="modal-title rl-modal-title">{activeRoom?.type}</h5>
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
                      <span className={`rl-avail-pill ${activeRoom.available ? "ok" : "no"}`}>
                        {activeRoom.available ? "Available" : "Unavailable"}
                      </span>
                      <span className="rl-avail-pill dark">Capacity: {activeRoom.capacity} guests</span>
                      <span className="rl-avail-pill dark">
                        Price: {formatUSD(activeRoom.pricePerNight)}/night
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
                        {formatUSD(activeRoom.pricePerNight)} <span>/night</span>
                      </div>

                      <button
                        className="btn btn-primary rl-btn-primary"
                        type="button"
                        data-bs-dismiss="modal"
                        onClick={() => handleBooking(activeRoom)}
                        disabled={!activeRoom.available}
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
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/userprofiles.css";
import { saveUserProfile } from "../../api/resortApi";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: localStorage.getItem("user_name") || "",
    email: localStorage.getItem("user_email") || "",
    phone: "",
    address: "",
    idType: "",
    idNumber: "",
    photoUrl: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // ✅ Prevent memory leak from URL.createObjectURL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    setMsg("");
    setErrMsg("");
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    // ✅ Only images
    if (!selectedFile.type?.startsWith("image/")) {
      alert("Please upload an image file only (JPG, PNG, JPEG).");
      return;
    }

    // ✅ Max size 2MB
    const max = 2 * 1024 * 1024;
    if (selectedFile.size > max) {
      alert("Image size must be under 2MB.");
      return;
    }

    // ✅ Cleanup old preview URL
    if (preview) URL.revokeObjectURL(preview);

    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setPreview(url);

    // ✅ For now: set photoUrl (demo). In production: upload to Cloudinary/S3 and save real URL.
    setForm((p) => ({ ...p, photoUrl: url }));
  };

  const onBrowse = () => fileRef.current?.click();

  const removeFile = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    setForm((p) => ({ ...p, photoUrl: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);

    const dropped = e.dataTransfer?.files?.[0];
    handleFile(dropped);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setDragOver(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
  };

  const resetForm = () => {
    setForm({
      name: localStorage.getItem("user_name") || "",
      email: localStorage.getItem("user_email") || "",
      phone: "",
      address: "",
      idType: "",
      idNumber: "",
      photoUrl: "",
    });
    removeFile();
    setMsg("");
    setErrMsg("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setErrMsg("");

    const token = localStorage.getItem("token");
    if (!token) {
      setErrMsg("You are not logged in. Please login first.");
      return;
    }

    if (!form.phone.trim()) {
      setErrMsg("Please enter phone number.");
      return;
    }

    if (!form.address.trim()) {
      setErrMsg("Please enter address.");
      return;
    }

    if (!form.idType) {
      setErrMsg("Please select ID proof type.");
      return;
    }

    if (!form.idNumber.trim()) {
      setErrMsg("Please enter ID proof number.");
      return;
    }

    // ✅ API wants "idProof" string like: PASSPORT-AB123456
    const idProof = `${form.idType.toUpperCase()}-${form.idNumber.trim()}`;

    // ✅ API expects JSON, so we send photoUrl string
    if (!form.photoUrl) {
      setErrMsg("Please upload profile photo/ID image (or provide photoUrl).");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        phone: form.phone.trim(),
        address: form.address.trim(),
        idProof,
        photoUrl: form.photoUrl,
      };

      const res = await saveUserProfile(payload);

      setMsg("Profile saved successfully ✅");
      console.log("Profile API Response:", res?.data);

      // ✅ OPTIONAL: mark profile complete in localStorage
      localStorage.setItem("profile_completed", "true");

      // ✅ Redirect to booking page after success
      setTimeout(() => {
        navigate("/booking/:roomId"); // ✅ change this path if your booking route is different
      }, 1000);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to save profile";
      setErrMsg(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="profile-wrap">
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card profile-card shadow-sm border-0">
              <div className="card-body p-4 p-md-5">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
                  <div>
                    <h3 className="mb-1 profile-title">Profile Details</h3>
                    <p className="text-muted mb-0 profile-subtitle">
                      Fill your details and upload your ID proof.
                    </p>
                  </div>
                  <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2">
                    Verified Profile
                  </span>
                </div>

                {/* ✅ Success/Error */}
                {msg && <div className="alert alert-success py-2">{msg}</div>}
                {errMsg && <div className="alert alert-danger py-2">{errMsg}</div>}

                <form onSubmit={onSubmit}>
                  {/* Basic Details */}
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        placeholder="Enter your name"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="Enter your email"
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-control"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="+91-9876543210"
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">ID Proof Type</label>
                      <select
                        className="form-select"
                        name="idType"
                        value={form.idType}
                        onChange={onChange}
                        required
                      >
                        <option value="">Select ID Proof</option>
                        <option value="aadhaar">Aadhaar</option>
                        <option value="pan">PAN</option>
                        <option value="passport">Passport</option>
                        <option value="licence">Driving Licence</option>
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label">ID Proof Number</label>
                      <input
                        className="form-control"
                        name="idNumber"
                        value={form.idNumber}
                        onChange={onChange}
                        placeholder="e.g. AB123456 / 1234 5678 9012"
                        required
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        name="address"
                        value={form.address}
                        onChange={onChange}
                        placeholder="Enter your address"
                        required
                      />
                    </div>
                  </div>

                  {/* Upload */}
                  <div className="mt-4">
                    <label className="form-label d-flex align-items-center justify-content-between">
                      <span>Photo / ID Proof Upload</span>
                      {file && (
                        <span className="text-muted small">
                          {file.name} ({Math.ceil(file.size / 1024)} KB)
                        </span>
                      )}
                    </label>

                    <div
                      className={`drop-zone ${preview ? "has-file" : ""} ${
                        dragOver ? "drag-over" : ""
                      }`}
                      onDragOver={onDragOver}
                      onDragLeave={onDragLeave}
                      onDrop={onDrop}
                      onClick={onBrowse}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") onBrowse();
                      }}
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="d-none"
                        onChange={(e) => {
                          const f = e.target.files && e.target.files[0];
                          handleFile(f);
                        }}
                      />

                      {!preview ? (
                        <div className="text-center">
                          <div className="upload-icon mb-2">📷</div>
                          <h6 className="mb-1">Drag & drop your image</h6>
                          <p className="mb-0 text-muted small">
                            or click to browse (JPG/PNG, max 2MB)
                          </p>
                        </div>
                      ) : (
                        <div className="preview-wrap">
                          <img src={preview} alt="preview" className="preview-img" />
                          <div className="preview-actions">
                            <button
                              type="button"
                              className="btn btn-light btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onBrowse();
                              }}
                            >
                              Change
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeFile();
                              }}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Optional photoUrl input */}
                    <div className="mt-3">
                      <label className="form-label">Photo URL (optional)</label>
                      <input
                        className="form-control"
                        name="photoUrl"
                        value={form.photoUrl}
                        onChange={onChange}
                        placeholder="https://..."
                      />
                      <div className="form-text">
                        If your backend gives a hosted URL, paste it here.
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="d-flex flex-column flex-md-row gap-2 justify-content-end mt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={resetForm}
                      disabled={submitting}
                    >
                      Reset
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4"
                      disabled={submitting}
                    >
                      {submitting ? "Saving..." : "Save Profile"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <p className="text-center text-muted small mt-3 mb-0">
              Tip: Use a clear photo so your ID details are readable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
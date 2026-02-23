import React, { useRef, useState } from "react";
import "../../styles/userProfiles.css";


export default function UserProfilePage() {
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    idType: "",
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    // Only images
    if (!selectedFile.type.startsWith("image/")) {
      alert("Please upload an image file only (jpg, png, jpeg).");
      return;
    }

    const max = 2 * 1024 * 1024;
    if (selectedFile.size > max) {
      alert("Image size must be under 2MB.");
      return;
    }

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropped = e.dataTransfer.files?.[0];
    handleFile(dropped);
  };

  const onBrowse = () => fileRef.current?.click();

  const removeFile = () => {
    setFile(null);
    setPreview("");
    if (fileRef.current) fileRef.current.value = "";
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.idType) {
      alert("Please select an ID proof type.");
      return;
    }
    if (!file) {
      alert("Please upload your ID proof image.");
      return;
    }

    // Here you can send to backend using FormData
    // const fd = new FormData();
    // Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    // fd.append("idProofImage", file);
    // fetch("/api/profile", { method:"POST", body: fd })

    console.log("Submitted:", form, file);
    alert("Profile submitted successfully ✅");
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
                        required
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
                        required
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
                        placeholder="Enter phone number"
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
                        <option value="aadhaar">Aadhaar Card</option>
                        <option value="pan">PAN Card</option>
                        <option value="licence">Driving Licence</option>
                      </select>
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
                      <span>ID Proof Upload</span>
                      {file && (
                        <span className="text-muted small">
                          {file.name} ({Math.ceil(file.size / 1024)} KB)
                        </span>
                      )}
                    </label>

                    <div
                      className={`drop-zone ${preview ? "has-file" : ""}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={onDrop}
                      onClick={onBrowse}
                      role="button"
                      tabIndex={0}
                    >
                      <input
                        ref={fileRef}
                        type="file"
                        accept="image/*"
                        className="d-none"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                      />

                      {!preview ? (
                        <div className="text-center">
                          <div className="upload-icon mb-2">📷</div>
                          <h6 className="mb-1">Drag & drop your ID proof image</h6>
                          <p className="mb-0 text-muted small">
                            or click to browse (JPG/PNG, max 2MB)
                          </p>
                        </div>
                      ) : (
                        <div className="preview-wrap">
                          <img src={preview} alt="ID preview" className="preview-img" />
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
                  </div>

                  {/* Submit */}
                  <div className="d-flex flex-column flex-md-row gap-2 justify-content-end mt-4">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => {
                      setForm({ name: "", email: "", phone: "", address: "", idType: "" });
                      removeFile();
                    }}>
                      Reset
                    </button>
                    <button type="submit" className="btn btn-primary px-4">
                      Save Profile
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

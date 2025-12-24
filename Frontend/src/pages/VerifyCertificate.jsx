import React, { useState } from "react";
import axios from "axios";
import "./VerifyCertificate.css";

const VerifyCertificate = () => {
  const [certificateId, setCertificateId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certificateId) return;

    try {
      setLoading(true);
      setError("");
      setData(null);

      const res = await axios.get(
        `http://localhost:3000/api/verify/${certificateId}`
      );

      setData(res.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "Certificate not found or invalid"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    window.open(
      `http://localhost:3000/api/certificates/download/${certificateId}`,
      "_blank"
    );
  };

  console.log(data);
  

  return (
    <div className="verify-container">
      <h2>Certificate Verification</h2>

      <form onSubmit={handleVerify} className="verify-form">
        <input
          type="text"
          placeholder="Enter Certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="certificate-card">
          <h3>Status: <span className="valid"> {data.status} </span></h3>
          <p><strong>Name:</strong> {data.student?.name}</p>
          <p><strong>Domain:</strong> {data.student?.domain}</p>
          <p><strong>Duration:</strong> {new Date(data.student?.startDate).toLocaleDateString()} → {new Date(data.student?.endDate).toLocaleDateString()}</p>
          <p><strong>Generated At:</strong> {new Date(data.generatedAt).toLocaleDateString()}</p>

          <button className="download-btn" onClick={handleDownload}>
            Download Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyCertificate;

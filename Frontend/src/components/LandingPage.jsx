import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing">

      <section className="hero">
        <div className="hero-content">
          <h1>CertVerify</h1>
          <p>
            Smart Certificate Management & Verification Platform
          </p>

          <div className="hero-actions">
            <Link to="/verify" className="btn-primary">Verify Certificate</Link>
            <Link to="/login" className="btn-secondary">Admin Login</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2>Platform Features</h2>

        <div className="feature-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="workflow">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">Upload Student Data</div>
          <div className="step">Generate Certificates</div>
          <div className="step">Students Verify & Download</div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 CertVerify. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

const features = [
  { title: "User Roles & Authentication", text: "Secure admin & user access with role-based permissions." },
  { title: "Bulk Data Upload", text: "Admins upload student data using Excel files." },
  { title: "Automatic Certificate Generation", text: "Certificates generated with correct details instantly." },
  { title: "Certificate Search", text: "Students verify certificates using unique IDs." },
  { title: "Certificate Download", text: "Download certificates in PDF format." },
  { title: "Security & Integrity", text: "Encrypted authentication & data validation checks." }
];

import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, studentsRes] = await Promise.all([
          api.get("/admin/stats"),
          api.get("/admin/students?limit=5")
        ]);

        setStats(statsRes.data);
        setStudents(studentsRes.data.students);
      } catch (err) {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <p>Total Students</p>
          <h3>{stats.totalStudents}</h3>
        </div>

        <div className="stat-card">
          <p>Total Certificates</p>
          <h3>{stats.totalCertificates}</h3>
        </div>
      </div>

      {/* Recent Students */}
      <div className="recent-section">
        <h3>Recent Students</h3>

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Domain</th>
                <th>Certificate</th>
              </tr>
            </thead>
            <tbody>
              {students?.map((s) => (
                <tr key={s._id}>
                  <td>{s.studentId}</td>
                  <td>{s.name}</td>
                  <td>{s.domain}</td>
                  <td>{s.certificateId || "Not generated"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

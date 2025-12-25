import { useEffect, useState } from "react";
import api from "../../api/axios";
import {toast} from "react-toastify"
import "./Students.css";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/admin/students?page=${page}&limit=10&search=${search}`
      );
      setStudents(res.data.students);
      setTotalPages(res.data.totalPages);
    } catch {
      setError("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [page, search]);

  // Open confirm modal
  const handleGenerateClick = (studentId) => {
    setSelectedStudentId(studentId);
    setShowConfirm(true);
  };

  // Confirm and generate certificate
  const confirmGenerate = async () => {
    try {
      await api.post(
        `/certificates/generate-certificate/${selectedStudentId}`
      );
      toast.success("Certificate Generated ")
      fetchStudents();
    } catch {
      toast.error("Failed to generate certificate");
    } finally {
      setShowConfirm(false);
      setSelectedStudentId(null);
    }
  };

  return (
    <div className="students-container">
      <div className="students-header">
        <h2>Students</h2>
        <p className="subtitle">Search and manage student certificates</p>
      </div>

      <input
        className="search-input"
        placeholder="Search by name or student ID"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && students.length > 0 && (
        <>
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Domain</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.studentId}</td>
                    <td>{s.name}</td>
                    <td>{s.domain}</td>
                    <td>
                      {s.certificateId ? (
                        <span className="status success">Generated</span>
                      ) : (
                        <span className="status pending">Pending</span>
                      )}
                    </td>
                    <td className="actions">
                      {s.certificateId && (
                        <button
                          className="generate-btn"
                          onClick={() => handleGenerateClick(s._id)}
                        >
                          Generate
                        </button>
                      )}

                      {s.certificateId && (
                        <a
                          className="download-btn"
                          href={`http://localhost:3000/api/certificates/download/${s.certificateId}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Download
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
              Prev
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Generate Certificate</h3>
            <p>
              Are you sure you want to generate a certificate for this student?
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>

              <button
                className="modal-confirm"
                onClick={confirmGenerate}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;

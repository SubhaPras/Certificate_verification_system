import { useEffect, useState } from "react";
import api from "../../api/axios";
import "./Students.css";

const Students = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const res = await api.get(
                `/admin/students?page=${page}&limit=10&search=${search}`
            );

            setStudents(res.data.students);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            setError("Failed to load students");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [page, search]);

    const generateCertificate = async (studentId) => {
        const confirm = window.confirm(
            "Generate certificate for this student?"
        );
        if (!confirm) return;

        try {
            await api.post(`/certificates/generate-certificate/${studentId}`);
            fetchStudents();
        } catch (err) {
            alert("Failed to generate certificate");
        }
    };

    return (
        <div className="students-container">
            <h2>Students</h2>

            <input
                className="search-input"
                placeholder="Search by name or student ID"
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                }}
            />

            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && students.length > 0 && (
                <>
                    <table className="students-table">
                        <thead>
                            <tr>
                                <th>Student ID</th>
                                <th>Name</th>
                                <th>Domain</th>
                                <th>Certificate</th>
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
                                        {s.certificateId ? s.certificateId : "Not generated"}
                                    </td>
                                    <td className="actions">
                                        {s.certificateId && (
                                            <button
                                                className="generate-btn"
                                                onClick={() => generateCertificate(s._id)}
                                            >
                                                Generate Certificate
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

                    <div className="pagination">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                        >
                            Prev
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Students;

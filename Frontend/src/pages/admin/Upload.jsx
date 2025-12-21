import { useState } from "react";
import * as XLSX from "xlsx";
import api from "../../api/axios";
import "./Upload.css";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError("");
    setMessage("");

    if (!selectedFile) return;

    if (
      !selectedFile.name.endsWith(".xlsx") &&
      !selectedFile.name.endsWith(".xls")
    ) {
      setError("Please upload a valid Excel file");
      return;
    }

    setFile(selectedFile);
    previewExcel(selectedFile);
  };

  const previewExcel = (file) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet);

      setPreview(json.slice(0, 5)); // show first 5 rows
    };

    reader.readAsBinaryString(file);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("excel", file);

      const res = await api.post("/admin/upload-excel", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage(res.data.message || "Excel uploaded successfully");
      setFile(null);
      setPreview([]);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to upload Excel file"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Students Excel</h2>

      <div className="upload-card">
        <input type="file" accept=".xlsx,.xls" onChange={handleFileChange} />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

        {preview.length > 0 && (
          <>
            <h4>Preview (first 5 rows)</h4>
            <div className="preview-table">
              <table>
                <thead>
                  <tr>
                    {Object.keys(preview[0]).map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {preview.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((val, i) => (
                        <td key={i}>{String(val)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <button onClick={handleUpload} disabled={loading}>
          {loading ? "Uploading..." : "Upload Excel"}
        </button>
      </div>
    </div>
  );
};

export default Upload;

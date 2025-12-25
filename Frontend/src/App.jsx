import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Login from "./pages/Login.jsx";
import VerifyCertificate from "./pages/VerifyCertificate.jsx";
// import Certificate from "./pages/Certificate";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import Upload from "./pages/admin/Upload.jsx";
import Students from "./pages/admin/Students.jsx";
import ProtectedRoute from "./auth/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import LandingPage from "./components/LandingPage.jsx";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ToastContainer />
      <Routes>

        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        {/* <Route path="/certificate/:id" element={<Certificate />} /> */}

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

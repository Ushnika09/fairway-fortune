import { BrowserRouter, Routes, Route } from "react-router-dom";

// Public pages
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User pages
import Dashboard from "./pages/Dashboard";
import Subscription from "./pages/Subscription";
import Charity from "./pages/Charity";
import Results from "./pages/Results";

// Admin pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminCharities from "./pages/AdminCharities";
import AdminDraw from "./pages/AdminDraw";
import AdminResults from "./pages/AdminResults";

// Route guards
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRoute from "./utils/AdminRoute";

// Context
import { AdminProvider } from "./context/AdminContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 👤 USER ROUTES */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />

        <Route
          path="/charity"
          element={
            <ProtectedRoute>
              <Charity />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        {/* ⚙️ ADMIN ROUTES (WITH CONTEXT) */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute>
              <AdminProvider>
                <Routes>
                  <Route path="" element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="charities" element={<AdminCharities />} />
                  <Route path="draw" element={<AdminDraw />} />
                  <Route path="results" element={<AdminResults />} />
                </Routes>
              </AdminProvider>
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
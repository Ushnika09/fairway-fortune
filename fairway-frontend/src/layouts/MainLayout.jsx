import { Link, useNavigate } from "react-router-dom";

export default function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-dark">

      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[rgba(15,23,42,0.8)] border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <h1
            onClick={() => navigate("/dashboard")}
            className="text-xl font-bold text-accent cursor-pointer"
          >
            Fairway Fortune
          </h1>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">

            <Link to="/dashboard" className="hover:text-accent transition">
              Dashboard
            </Link>

            <Link to="/subscription" className="hover:text-accent transition">
              Subscription
            </Link>

            <Link to="/charity" className="hover:text-accent transition">
              Charity
            </Link>

            <Link to="/results" className="hover:text-accent transition">
              Results
            </Link>

            <button
              onClick={handleLogout}
              className="bg-accent text-black px-4 py-1.5 rounded-md hover:scale-105 transition"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="pt-24 px-6">
        {children}
      </div>

    </div>
  );
}
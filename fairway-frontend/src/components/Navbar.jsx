import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[rgba(15,23,42,0.7)] border-b border-gray-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <h1 className="text-xl font-bold text-accent">
          Fairway Fortune
        </h1>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          <Link to="/" className="hover:text-accent transition">
            Home
          </Link>
          <Link to="/login" className="hover:text-accent transition">
            Login
          </Link>
          <Link to="/register">
            <button className="bg-accent text-black px-4 py-1.5 rounded-md hover:scale-105 transition">
              Join Now
            </button>
          </Link>
        </div>

      </div>
    </nav>
  );
}
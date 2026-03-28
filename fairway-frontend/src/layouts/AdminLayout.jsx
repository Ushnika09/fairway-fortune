import { Link, useNavigate } from "react-router-dom";

export default function AdminLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-dark">

      {/* SIDEBAR */}
      <div className="w-64 bg-[#0f172a] border-r border-white/5 p-6 space-y-6">

        <h1 className="text-accent font-bold text-xl">
          Admin ⚙️
        </h1>

        <div className="flex flex-col gap-4 text-sm">

          <Link to="/admin" className="hover:text-accent">Dashboard</Link>
          <Link to="/admin/users" className="hover:text-accent">Users</Link>
          <Link to="/admin/charities" className="hover:text-accent">Charities</Link>
          <Link to="/admin/draw" className="hover:text-accent">Draw</Link>
          <Link to="/admin/results" className="hover:text-accent">Results</Link>

        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-accent text-black px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* CONTENT */}
      <div className="flex-1 p-8">
        {children}
      </div>

    </div>
  );
}
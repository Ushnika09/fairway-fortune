import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
  "https://fairway-fortune.onrender.com/api/auth/login",
  form
);

// store token + user
localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user));

// role-based redirect
const role = res.data.user.role;

if (role === "admin") {
  navigate("/admin");
} else {
  navigate("/dashboard");
}

    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-6">

      {/* Card */}
      <div className="bg-[#111827] border border-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-dark border border-gray-700 focus:outline-none focus:border-accent"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-dark border border-gray-700 focus:outline-none focus:border-accent"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-accent to-yellow-500 text-black py-3 rounded-lg font-semibold hover:scale-105 transition shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* Register link */}
        <p className="text-textSecondary text-sm text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-accent hover:underline">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}
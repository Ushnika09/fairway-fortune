import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    users: 0,
    charities: 0,
    results: 0,
    totalPrize: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, charitiesRes, resultsRes] = await Promise.all([
        axios.get("https://fairway-fortune.onrender.com/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://fairway-fortune.onrender.com/api/charities"),
        axios.get("https://fairway-fortune.onrender.com/api/admin/results", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const totalPrize =
        resultsRes.data.results?.reduce(
          (sum, r) => sum + (r.prize || 0),
          0
        ) || 0;

      setStats({
        users: usersRes.data.users?.length || 0,
        charities: charitiesRes.data.charities?.length || 0,
        results: resultsRes.data.results?.length || 0,
        totalPrize,
      });

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold text-accent">
            Admin Dashboard ⚙️
          </h1>
          <p className="text-textSecondary mt-2">
            Overview of platform activity
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid md:grid-cols-4 gap-6">

          {/* USERS */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
            <p className="text-textSecondary text-sm">Total Users</p>
            <h2 className="text-2xl font-bold text-accent mt-2">
              {stats.users}
            </h2>
          </div>

          {/* CHARITIES */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
            <p className="text-textSecondary text-sm">Charities</p>
            <h2 className="text-2xl font-bold text-accent mt-2">
              {stats.charities}
            </h2>
          </div>

          {/* RESULTS */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
            <p className="text-textSecondary text-sm">Total Results</p>
            <h2 className="text-2xl font-bold text-accent mt-2">
              {stats.results}
            </h2>
          </div>

          {/* PRIZE */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
            <p className="text-textSecondary text-sm">Total Prize Paid</p>
            <h2 className="text-2xl font-bold text-green-400 mt-2">
              ₹{stats.totalPrize.toFixed(2)}
            </h2>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}
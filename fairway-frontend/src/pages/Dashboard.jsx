import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [score, setScore] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "https://fairway-fortune.onrender.com/api/user/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddScore = async () => {
    if (!score) return;

    try {
      setLoading(true);

      await axios.post(
        "https://fairway-fortune.onrender.com/api/user/add-score",
        { score: Number(score) },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setScore("");
      fetchUser();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
    <div className="min-h-screen bg-dark p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold">
          Welcome {user?.name || "User"} 👋
        </h1>

        {/* 🔥 STATS CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
            <p className="text-textSecondary text-sm">Total Scores</p>
            <h2 className="text-2xl font-bold text-accent">
              {user?.scores?.length || 0}
            </h2>
          </div>

          <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
            <p className="text-textSecondary text-sm">Subscription</p>
            <h2 className="text-lg font-semibold">
              {user?.subscription?.status === "active"
                ? "Active"
                : "Inactive"}
            </h2>
          </div>

          <div className="bg-[#111827] border border-gray-800 p-5 rounded-xl">
            <p className="text-textSecondary text-sm">Plan</p>
            <h2 className="text-lg font-semibold text-accent">
              {user?.subscription?.plan || "None"}
            </h2>
          </div>

        </div>

        {/* SCORES */}
        <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Your Last 5 Scores</h2>

          <div className="flex gap-4 flex-wrap">
            {user?.scores?.length > 0 ? (
              user.scores.map((s, i) => (
                <div
                  key={i}
                  className="w-16 h-16 flex items-center justify-center rounded-lg bg-dark border border-gray-700 text-lg font-bold hover:border-accent transition"
                >
                  {s}
                </div>
              ))
            ) : (
              <p className="text-textSecondary">No scores yet</p>
            )}
          </div>
        </div>

        {/* ADD SCORE */}
        <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Add New Score</h2>

          <div className="flex gap-4">
            <input
              type="number"
              value={score}
              onChange={(e) => setScore(e.target.value)}
              placeholder="Enter score (1-45)"
              className="p-3 rounded-lg bg-dark border border-gray-700 w-full"
            />

            <button
              onClick={handleAddScore}
              className="bg-gradient-to-r from-accent to-yellow-500 text-black px-6 rounded-lg hover:scale-105 transition"
            >
              {loading ? "Adding..." : "Add"}
            </button>
          </div>
        </div>

        {/* SUBSCRIPTION */}
        <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl">
          <h2 className="text-xl mb-2">Subscription Status</h2>

          <p className="text-textSecondary">
            {user?.subscription?.status === "active"
              ? `Active (${user.subscription.plan})`
              : "Not Subscribed"}
          </p>
        </div>

      </div>
    </div>
    </MainLayout>
  );
}
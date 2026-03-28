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
          <div>
            <h1 className="text-3xl font-bold">
              Welcome {user?.name || "User"} 👋
            </h1>
            <p className="text-textSecondary mt-1">
              Track your scores, manage subscription, and play smart
            </p>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-accent transition">
              <p className="text-textSecondary text-sm">Total Scores</p>
              <h2 className="text-3xl font-bold text-accent mt-2">
                {user?.scores?.length || 0}
              </h2>
              <p className="text-xs text-textSecondary mt-1">
                Last entries recorded
              </p>
            </div>

            <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-accent transition">
              <p className="text-textSecondary text-sm">Subscription</p>
              <h2 className="text-lg font-semibold mt-2">
                {user?.subscription?.status === "active" ? (
                  <span className="text-green-400">Active</span>
                ) : (
                  <span className="text-yellow-400">Inactive</span>
                )}
              </h2>
              <p className="text-xs text-textSecondary mt-1">
                Current status
              </p>
            </div>

            <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-accent transition">
              <p className="text-textSecondary text-sm">Plan</p>
              <h2 className="text-lg font-semibold text-accent mt-2">
                {user?.subscription?.plan || "None"}
              </h2>
              <p className="text-xs text-textSecondary mt-1">
                Selected plan
              </p>
            </div>

          </div>

          {/* SCORES */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
            <h2 className="text-xl mb-4 font-semibold">
              Your Last 5 Scores
            </h2>

            <div className="flex gap-3 flex-wrap">
              {user?.scores?.length > 0 ? (
                user.scores.map((s, i) => (
                  <div
                    key={i}
                    className="w-14 h-14 flex items-center justify-center rounded-xl bg-dark border border-white/10 text-lg font-bold hover:border-accent transition"
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
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-semibold">Add New Score</h2>

            <div className="flex gap-4">
              <input
                type="number"
                value={score}
                onChange={(e) => setScore(e.target.value)}
                placeholder="Enter score (1-45)"
                className="p-3 rounded-lg bg-dark border border-white/10 w-full focus:outline-none focus:border-accent"
              />

              <button
                onClick={handleAddScore}
                className="bg-gradient-to-r from-accent to-yellow-500 text-black px-6 rounded-lg font-semibold hover:scale-105 transition"
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>

          {/* SUBSCRIPTION */}
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
            <h2 className="text-xl mb-2 font-semibold">
              Subscription Status
            </h2>

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
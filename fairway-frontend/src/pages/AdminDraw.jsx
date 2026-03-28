import { useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDraw() {
  const [draw, setDraw] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleRunDraw = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        "https://fairway-fortune.onrender.com/api/admin/draw/run",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDraw(res.data.draw);
    } catch (err) {
      console.log(err);
      alert("Error running draw");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!draw?._id) return alert("Run draw first");

    try {
      setLoading(true);

      await axios.post(
        "https://fairway-fortune.onrender.com/api/admin/draw/publish",
        { drawId: draw._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Draw published successfully 🚀");
      setDraw(null);
    } catch (err) {
      console.log(err);
      alert("Error publishing draw");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Draw System 🎯</h1>
          <p className="text-textSecondary mt-1">
            Generate and publish lucky draw results
          </p>
        </div>

        {/* RUN DRAW CARD */}
        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">

          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Run New Draw</h2>

            <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-1 rounded-md">
              Admin Action
            </span>
          </div>

          <button
            onClick={handleRunDraw}
            className="bg-gradient-to-r from-accent to-yellow-500 text-black px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
          >
            {loading ? "Generating..." : "Run Draw"}
          </button>

          {/* DRAW NUMBERS */}
          {draw && (
            <div className="mt-6 space-y-4">

              <p className="text-textSecondary text-sm">
                Generated Numbers
              </p>

              <div className="flex gap-3 flex-wrap">
                {draw.numbers.map((n, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-yellow-500 text-black font-bold shadow-md"
                  >
                    {n}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-yellow-400">●</span>
                <span className="text-textSecondary">Draft Mode</span>
              </div>

            </div>
          )}
        </div>

        {/* PUBLISH CARD */}
        {draw && (
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">

            <h2 className="text-lg font-semibold">Publish Draw</h2>

            <p className="text-textSecondary text-sm">
              This will finalize results and distribute prizes to winners.
            </p>

            <button
              onClick={handlePublish}
              className="bg-green-500 text-black px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
            >
              {loading ? "Publishing..." : "Publish Draw"}
            </button>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}
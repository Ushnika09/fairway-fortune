import { useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDraw() {
  const [draw, setDraw] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // RUN DRAW
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

  // PUBLISH DRAW
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
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Draw Control 🎯</h1>
          <p className="text-textSecondary mt-2">
            Run and publish lottery draws
          </p>
        </div>

        {/* RUN DRAW */}
        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">

          <h2 className="text-xl font-semibold">Run New Draw</h2>

          <button
            onClick={handleRunDraw}
            className="bg-gradient-to-r from-accent to-yellow-500 text-black px-6 py-2 rounded-xl"
          >
            {loading ? "Generating..." : "Run Draw"}
          </button>

          {/* SHOW NUMBERS */}
          {draw && (
            <div className="mt-4 space-y-4">

              <p className="text-textSecondary">Generated Numbers</p>

              <div className="flex gap-4 flex-wrap">
                {draw.numbers.map((n, i) => (
                  <div
                    key={i}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-dark border border-white/10 text-lg font-bold"
                  >
                    {n}
                  </div>
                ))}
              </div>

              <span className="text-yellow-400 text-sm">
                Status: Draft
              </span>

            </div>
          )}
        </div>

        {/* PUBLISH */}
        {draw && (
          <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">

            <h2 className="text-xl font-semibold">Publish Draw</h2>

            <p className="text-textSecondary">
              This will calculate winners and distribute prizes.
            </p>

            <button
              onClick={handlePublish}
              className="bg-green-500 text-black px-6 py-2 rounded-xl"
            >
              {loading ? "Publishing..." : "Publish Draw"}
            </button>

          </div>
        )}

      </div>
    </AdminLayout>
  );
}
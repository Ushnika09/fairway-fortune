import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        "https://fairway-fortune.onrender.com/api/admin/results",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setResults(res.data.results || []);
    } catch (err) {
      console.log(err);
      setResults([]);
    }
  };

  const handleApprove = async (resultId) => {
    try {
      setLoading(true);

      await axios.post(
        "https://fairway-fortune.onrender.com/api/admin/result/approve",
        { resultId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchResults();

    } catch (err) {
      console.log(err);
      alert("Error approving result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Results Management 🏆</h1>
          <p className="text-textSecondary mt-2">
            Approve and manage winners
          </p>
        </div>

        {/* TABLE */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">

          <table className="w-full text-sm">

            <thead className="bg-black/20">
              <tr className="text-left">
                <th className="p-4">User</th>
                <th>Matches</th>
                <th>Prize</th>
                <th>Status</th>
                <th className="text-right pr-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {results.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-textSecondary">
                    No results yet
                  </td>
                </tr>
              ) : (
                results.map((r) => (
                  <tr
                    key={r._id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="p-4">
                      <div>
                        <p className="font-medium">
                          {r.userId?.name || "User"}
                        </p>
                        <p className="text-xs text-textSecondary">
                          {r.userId?.email}
                        </p>
                      </div>
                    </td>

                    <td className="font-semibold text-accent">
                      {r.matches}
                    </td>

                    <td className="font-semibold text-green-400">
                      ₹{r.prize}
                    </td>

                    <td>
                      {r.status === "approved" ? (
                        <span className="text-green-400">Approved</span>
                      ) : (
                        <span className="text-yellow-400">Pending</span>
                      )}
                    </td>

                    <td className="text-right pr-4">
                      {r.status === "pending" && (
                        <button
                          onClick={() => handleApprove(r._id)}
                          className="bg-gradient-to-r from-accent to-yellow-500 text-black px-4 py-1.5 rounded-lg"
                        >
                          {loading ? "..." : "Approve"}
                        </button>
                      )}
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>
    </AdminLayout>
  );
}
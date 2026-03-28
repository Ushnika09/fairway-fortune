import { useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { useAdmin } from "../context/AdminContext";

export default function AdminResults() {
  const { results, loading: dataLoading, refresh } = useAdmin();
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

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

      refresh();
    } catch (err) {
      console.log(err);
      alert("Error approving result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Results 🏆</h1>
          <p className="text-textSecondary mt-1">
            Review and approve winners
          </p>
        </div>

        {/* CARD */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEAD */}
              <thead className="bg-black/20">
                <tr className="text-left">
                  <th className="p-4">User</th>
                  <th>Matches</th>
                  <th>Prize</th>
                  <th>Status</th>
                  <th className="text-right pr-4">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {dataLoading ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-textSecondary">
                      Loading results...
                    </td>
                  </tr>
                ) : results.length === 0 ? (
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
                      {/* USER */}
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

                      {/* MATCHES */}
                      <td>
                        <span className="px-2 py-1 bg-accent/20 text-accent rounded-md text-xs font-semibold">
                          {r.matches} Match
                        </span>
                      </td>

                      {/* PRIZE */}
                      <td>
                        <span className="font-semibold text-green-400">
                          ₹{r.prize}
                        </span>
                      </td>

                      {/* STATUS */}
                      <td>
                        {r.status === "approved" ? (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-md text-xs">
                            Approved
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-md text-xs">
                            Pending
                          </span>
                        )}
                      </td>

                      {/* ACTION */}
                      <td className="text-right pr-4">
                        {r.status === "pending" && (
                          <button
                            onClick={() => handleApprove(r._id)}
                            className="bg-gradient-to-r from-accent to-yellow-500 text-black px-4 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 transition"
                          >
                            {loading ? "Processing..." : "Approve"}
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

      </div>
    </AdminLayout>
  );
}
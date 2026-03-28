import { useAdmin } from "../context/AdminContext";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {
  const { users, charities, results, loading } = useAdmin();

  const totalPrize =
    results?.reduce((sum, r) => sum + (r.prize || 0), 0) || 0;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard ⚙️</h1>
          <p className="text-textSecondary mt-1">
            Overview of platform activity and performance
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-textSecondary">Loading stats...</p>
        ) : (
          <>

            {/* STATS GRID */}
            <div className="grid md:grid-cols-4 gap-6">

              {/* USERS */}
              <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-accent transition">
                <p className="text-textSecondary text-sm">Total Users</p>
                <h2 className="text-3xl font-bold mt-2 text-accent">
                  {users.length}
                </h2>
                <p className="text-xs text-textSecondary mt-1">
                  Registered accounts
                </p>
              </div>

              {/* CHARITIES */}
              <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-accent transition">
                <p className="text-textSecondary text-sm">Charities</p>
                <h2 className="text-3xl font-bold mt-2 text-accent">
                  {charities.length}
                </h2>
                <p className="text-xs text-textSecondary mt-1">
                  Active NGO partners
                </p>
              </div>

              {/* RESULTS */}
              <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-accent transition">
                <p className="text-textSecondary text-sm">Total Results</p>
                <h2 className="text-3xl font-bold mt-2 text-accent">
                  {results.length}
                </h2>
                <p className="text-xs text-textSecondary mt-1">
                  Draw outcomes generated
                </p>
              </div>

              {/* PRIZE */}
              <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-green-400 transition">
                <p className="text-textSecondary text-sm">Total Prize Paid</p>
                <h2 className="text-3xl font-bold mt-2 text-green-400">
                  ₹{totalPrize.toFixed(2)}
                </h2>
                <p className="text-xs text-textSecondary mt-1">
                  Distributed to winners
                </p>
              </div>

            </div>

            {/* EXTRA SECTION (OPTIONAL LOOK, NO LOGIC CHANGE) */}
            <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
              <h2 className="text-lg font-semibold mb-2">
                System Status
              </h2>
              <p className="text-textSecondary text-sm">
                All systems operational. Admin can manage users, run draws,
                approve results, and track charity contributions.
              </p>
            </div>

          </>
        )}

      </div>
    </AdminLayout>
  );
}
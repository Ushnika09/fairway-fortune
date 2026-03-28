import AdminLayout from "../layouts/AdminLayout";
import { useAdmin } from "../context/AdminContext";

export default function AdminUsers() {
  const { users, loading } = useAdmin();

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Users 👥</h1>
          <p className="text-textSecondary mt-1">
            Manage and view all registered users
          </p>
        </div>

        {/* CARD WRAPPER */}
        <div className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden">

          {loading ? (
            <div className="p-6 text-center text-textSecondary">
              Loading users...
            </div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-textSecondary">
              No users found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                {/* TABLE HEAD */}
                <thead className="bg-black/20">
                  <tr className="text-left">
                    <th className="p-4">User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Subscription</th>
                    <th>Scores</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {users.map((u) => (
                    <tr
                      key={u._id}
                      className="border-t border-white/5 hover:bg-white/5 transition"
                    >
                      {/* USER */}
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-textSecondary">
                            ID: {u._id.slice(-6)}
                          </p>
                        </div>
                      </td>

                      {/* EMAIL */}
                      <td className="text-textSecondary">
                        {u.email}
                      </td>

                      {/* ROLE */}
                      <td>
                        <span
                          className={`px-2 py-1 rounded-md text-xs ${
                            u.role === "admin"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-blue-500/20 text-blue-400"
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>

                      {/* SUBSCRIPTION */}
                      <td>
                        {u.subscription?.status ? (
                          <span className="text-green-400">
                            {u.subscription.status}
                          </span>
                        ) : (
                          <span className="text-textSecondary">
                            None
                          </span>
                        )}
                      </td>

                      {/* SCORES */}
                      <td>
                        {u.scores?.length ? (
                          <div className="flex flex-wrap gap-1">
                            {u.scores.map((s, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-dark border border-white/10 rounded-md text-xs"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-textSecondary">
                            No scores
                          </span>
                        )}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
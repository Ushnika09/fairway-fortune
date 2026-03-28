import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(
      "https://fairway-fortune.onrender.com/api/admin/users",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    setUsers(res.data.users || []);
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">All Users 👥</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10 rounded-xl">

          <thead className="bg-[#111827]">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Subscription</th>
              <th>Scores</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t border-white/5">
                <td className="p-3">{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.subscription?.status}</td>
                <td>{u.scores?.join(", ")}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </AdminLayout>
  );
}
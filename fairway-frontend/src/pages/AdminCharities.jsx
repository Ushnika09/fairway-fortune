import { useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { useAdmin } from "../context/AdminContext";

export default function AdminCharities() {
  const { charities, loading: dataLoading, refresh } = useAdmin();

  const [form, setForm] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    if (!form.name.trim()) return alert("Name required");

    try {
      setLoading(true);

      await axios.post(
        "https://fairway-fortune.onrender.com/api/admin/charity",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setForm({ name: "", description: "" });
      refresh();
    } catch (err) {
      console.log(err);
      alert("Error adding charity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Charities ❤️</h1>
          <p className="text-textSecondary mt-1">
            Manage NGO partners and contributions
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-semibold">Add New Charity</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Charity Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="p-3 rounded-xl bg-dark border border-white/10 focus:outline-none focus:border-accent"
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="p-3 rounded-xl bg-dark border border-white/10 focus:outline-none focus:border-accent"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-accent to-yellow-500 text-black px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
          >
            {loading ? "Adding..." : "Add Charity"}
          </button>
        </div>

        {/* LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Charities</h2>

          {dataLoading ? (
            <p className="text-textSecondary">Loading...</p>
          ) : charities.length === 0 ? (
            <p className="text-textSecondary">No charities found</p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {charities.map((c) => (
                <div
                  key={c._id}
                  className="bg-[#111827] border border-white/5 p-5 rounded-2xl hover:border-accent transition"
                >
                  <h3 className="text-lg font-semibold">{c.name}</h3>

                  <p className="text-sm text-textSecondary mt-2">
                    {c.description || "No description"}
                  </p>

                  <p className="text-xs text-textSecondary mt-4">
                    ID: {c._id.slice(-6)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
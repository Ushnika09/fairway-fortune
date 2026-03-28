import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminCharities() {
  const [charities, setCharities] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCharities();
  }, []);

  const fetchCharities = async () => {
    try {
      const res = await axios.get(
        "https://fairway-fortune.onrender.com/api/charities"
      );

      setCharities(res.data.charities || []);
    } catch (err) {
      console.log(err);
      setCharities([]);
    }
  };

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
      fetchCharities();

    } catch (err) {
      console.log(err);
      alert("Error adding charity");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-bold">Charities ❤️</h1>
          <p className="text-textSecondary mt-2">
            Manage all NGO partners in the system
          </p>
        </div>

        {/* ADD FORM */}
        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold">Add New Charity</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              placeholder="Charity Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="p-3 rounded-xl bg-dark border border-white/10"
            />

            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="p-3 rounded-xl bg-dark border border-white/10"
            />
          </div>

          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-accent to-yellow-500 text-black px-6 py-2 rounded-xl"
          >
            {loading ? "Adding..." : "Add Charity"}
          </button>
        </div>

        {/* LIST */}
        <div>
          <h2 className="text-xl font-semibold mb-4">All Charities</h2>

          {charities.length === 0 ? (
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
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}
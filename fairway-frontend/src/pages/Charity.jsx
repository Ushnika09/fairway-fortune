import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Charity() {
  const [charities, setCharities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [percent, setPercent] = useState(10);
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
      setCharities(res.data.charities);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    if (!selected) return alert("Select a charity");
    if (percent < 10) return alert("Minimum 10% required");

    try {
      setLoading(true);

      await axios.post(
        "https://fairway-fortune.onrender.com/api/user/select-charity",
        {
          charityId: selected,
          charityPercent: percent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Charity selected successfully ❤️");

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-10">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            Choose a Charity ❤️
          </h1>
          <p className="text-textSecondary">
            Support a cause while playing — make your contribution count
          </p>
        </div>

        {/* CHARITY CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          {charities.map((charity) => (
            <div
              key={charity._id}
              onClick={() => setSelected(charity._id)}
              className={`cursor-pointer p-6 rounded-2xl border transition-all duration-200
              ${
                selected === charity._id
                  ? "border-accent bg-[#111827] scale-[1.02] shadow-lg"
                  : "border-gray-800 bg-[#111827] hover:border-accent hover:scale-[1.02]"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2">
                {charity.name}
              </h2>

              <p className="text-textSecondary text-sm">
                {charity.description || "No description available"}
              </p>

              {selected === charity._id && (
                <p className="text-xs text-accent mt-4">
                  ✓ Selected
                </p>
              )}
            </div>
          ))}
        </div>

        {/* PERCENT INPUT */}
        <div className="bg-[#111827] border border-gray-800 p-6 rounded-2xl space-y-3">
          <h2 className="text-lg font-semibold">
            Contribution Percentage (%)
          </h2>

          <input
            type="number"
            value={percent}
            onChange={(e) => setPercent(Number(e.target.value))}
            min={10}
            className="w-full p-3 rounded-lg bg-dark border border-gray-700 focus:outline-none focus:border-accent"
          />

          <p className="text-textSecondary text-sm">
            Minimum 10% goes to charity
          </p>
        </div>

        {/* SUBMIT */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-accent to-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-md"
          >
            {loading ? "Saving..." : "Confirm Selection"}
          </button>
        </div>

      </div>
    </MainLayout>
  );
}
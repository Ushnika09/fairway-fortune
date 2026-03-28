import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        "https://fairway-fortune.onrender.com/api/user/results",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(res.data.results || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-center">
          Your Results 🏆
        </h1>

        {loading ? (
          <p className="text-center text-textSecondary">Loading...</p>
        ) : results.length === 0 ? (
          <p className="text-center text-textSecondary">
            No results yet
          </p>
        ) : (
          <div className="space-y-6">

            {results.map((r) => (
              <div
                key={r._id}
                className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-md"
              >

                {/* Draw Numbers */}
                <div className="mb-4">
                  <h2 className="text-lg mb-2">Draw Numbers</h2>

                  <div className="flex gap-3">
                    {r.drawId?.numbers?.map((num, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-dark border border-gray-700"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Match + Prize */}
                <div className="flex justify-between items-center">

                  <p>
                    Matches:{" "}
                    <span className="text-accent font-bold">
                      {r.matches}
                    </span>
                  </p>

                  <p>
                    Prize:{" "}
                    <span className="text-green-500 font-bold">
                      ₹{r.prize}
                    </span>
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </MainLayout>
  );
}
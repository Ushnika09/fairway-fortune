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

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">
            Your Results 🏆
          </h1>
          <p className="text-textSecondary">
            Check your performance and winnings
          </p>
        </div>

        {/* STATES */}
        {loading ? (
          <p className="text-center text-textSecondary">
            Loading results...
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-textSecondary">
            No results yet
          </p>
        ) : (
          <div className="space-y-6">

            {results.map((r) => (
              <div
                key={r._id}
                className="bg-[#111827] border border-white/5 p-6 rounded-2xl hover:border-accent transition"
              >

                {/* DRAW NUMBERS */}
                <div className="mb-5">
                  <h2 className="text-sm text-textSecondary mb-2">
                    Draw Numbers
                  </h2>

                  <div className="flex gap-2 flex-wrap">
                    {r.drawId?.numbers?.map((num, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-accent to-yellow-500 text-black font-bold shadow"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>

                {/* STATS */}
                <div className="flex justify-between items-center">

                  {/* MATCHES */}
                  <div>
                    <p className="text-textSecondary text-sm">
                      Matches
                    </p>
                    <p className="text-xl font-bold text-accent">
                      {r.matches}
                    </p>
                  </div>

                  {/* PRIZE */}
                  <div className="text-right">
                    <p className="text-textSecondary text-sm">
                      Prize Won
                    </p>
                    <p className="text-xl font-bold text-green-400">
                      ₹{r.prize}
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </MainLayout>
  );
}
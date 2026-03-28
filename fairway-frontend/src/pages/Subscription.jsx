import { useState } from "react";
import axios from "axios";
import MainLayout from "../layouts/MainLayout";

export default function Subscription() {
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const plans = [
    { name: "monthly", price: 100 },
    { name: "quarterly", price: 250 },
    { name: "yearly", price: 1000 },
  ];

  const handleSubscribe = async () => {
    if (!selected) return alert("Select a plan");

    try {
      setLoading(true);

      await axios.post(
        "https://fairway-fortune.onrender.com/api/user/subscribe",
        { plan: selected },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Subscription successful 🎉");

    } catch (err) {
      console.log(err);
      alert("Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-dark p-6">
        <div className="max-w-5xl mx-auto space-y-10">

          {/* HEADER */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">
              Choose Your Plan 💰
            </h1>
            <p className="text-textSecondary">
              Unlock full access and start winning rewards
            </p>
          </div>

          {/* PLAN CARDS */}
          <div className="grid md:grid-cols-3 gap-6">

            {plans.map((plan) => {
              const isSelected = selected === plan.name;

              return (
                <div
                  key={plan.name}
                  onClick={() => setSelected(plan.name)}
                  className={`cursor-pointer p-6 rounded-2xl border transition-all duration-200 relative
                  ${
                    isSelected
                      ? "border-accent bg-[#111827] scale-[1.03] shadow-lg"
                      : "border-gray-800 bg-[#111827] hover:border-accent hover:scale-[1.02]"
                  }`}
                >
                  {/* TAG */}
                  {plan.name === "yearly" && (
                    <span className="absolute top-3 right-3 text-xs bg-accent text-black px-2 py-1 rounded-md">
                      Best Value
                    </span>
                  )}

                  {/* NAME */}
                  <h2 className="text-xl font-semibold mb-2 capitalize">
                    {plan.name}
                  </h2>

                  {/* PRICE */}
                  <p className="text-3xl font-bold text-accent">
                    ₹{plan.price}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="text-textSecondary mt-2 text-sm">
                    {plan.name === "monthly" && "30 days access"}
                    {plan.name === "quarterly" && "90 days access"}
                    {plan.name === "yearly" && "365 days access"}
                  </p>

                  {/* SELECTED */}
                  {isSelected && (
                    <p className="text-xs text-accent mt-4">
                      ✓ Selected Plan
                    </p>
                  )}
                </div>
              );
            })}

          </div>

          {/* BUTTON */}
          <div className="text-center">
            <button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-accent to-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:scale-105 transition shadow-md"
            >
              {loading ? "Processing..." : "Subscribe Now"}
            </button>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}
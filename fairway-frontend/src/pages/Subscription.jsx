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

        <h1 className="text-3xl font-bold text-center">
          Choose Your Plan 💰
        </h1>

        {/* PLAN CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelected(plan.name)}
              className={`cursor-pointer p-6 rounded-xl border transition 
              ${
                selected === plan.name
                  ? "border-accent bg-[#111827]"
                  : "border-gray-800 bg-[#111827] hover:border-accent"
              }`}
            >
              <h2 className="text-xl font-semibold mb-2 capitalize">
                {plan.name}
              </h2>

              <p className="text-3xl font-bold text-accent">
                ₹{plan.price}
              </p>

              <p className="text-textSecondary mt-2">
                {plan.name === "monthly" && "30 days access"}
                {plan.name === "quarterly" && "90 days access"}
                {plan.name === "yearly" && "365 days access"}
              </p>
            </div>
          ))}

        </div>

        {/* BUTTON */}
        <div className="text-center">
          <button
            onClick={handleSubscribe}
            className="bg-gradient-to-r from-accent to-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:scale-105 transition shadow-md"
          >
            {loading ? "Processing..." : "Subscribe Now"}
          </button>
        </div>

      </div>
    </div>
    </MainLayout>
  );
}
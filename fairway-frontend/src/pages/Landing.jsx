import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-dark relative overflow-hidden">

      <Navbar />

      {/* HERO SECTION */}
      <section className="relative h-screen pt-24 flex items-center justify-center text-center px-6">

        {/* Glow Effects */}
        <div className="absolute w-[500px] h-[500px] bg-accent/20 blur-3xl rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[400px] h-[400px] bg-primary/20 blur-3xl rounded-full bottom-[-100px] right-[-100px]" />

        <div className="max-w-3xl relative z-10">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Turn Your Golf Scores Into{" "}
            <span className="text-accent">Real Rewards 💰</span>
          </h1>

          <p className="text-textSecondary text-lg mb-8">
            Subscribe, play, and win. Plus, contribute to charity with every game.
          </p>

          <div className="flex justify-center gap-4 flex-wrap">
            <Link to="/register">
              <button className="bg-gradient-to-r from-accent to-yellow-500 text-black px-6 py-3 rounded-lg font-semibold hover:scale-105 transition shadow-lg">
                Start Playing
              </button>
            </Link>

            <button className="border border-accent text-accent px-6 py-3 rounded-lg hover:bg-accent hover:text-black transition">
              How It Works
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 text-center relative">
        <h2 className="text-3xl font-bold mb-12">How It Works</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Step 1 */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl hover:border-accent transition">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              1. Add Scores
            </h3>
            <p className="text-textSecondary">
              Enter your last 5 golf scores and get ready to compete.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl hover:border-accent transition">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              2. Subscribe
            </h3>
            <p className="text-textSecondary">
              Choose a plan and contribute to your selected charity.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl hover:border-accent transition">
            <h3 className="text-xl font-semibold mb-3 text-accent">
              3. Win Rewards
            </h3>
            <p className="text-textSecondary">
              Match numbers in the draw and win exciting rewards.
            </p>
          </div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-6 text-center relative">

        {/* Glow */}
        <div className="absolute w-[400px] h-[400px] bg-accent/10 blur-3xl rounded-full right-10" />

        <h2 className="text-3xl font-bold mb-12">
          Why Choose Fairway Fortune?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Feature 1 */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl hover:border-accent transition">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2 text-accent">
              Fair Draw System
            </h3>
            <p className="text-textSecondary">
              Every draw is completely random and transparent.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl hover:border-accent transition">
            <div className="text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-semibold mb-2 text-accent">
              Charity Contribution
            </h3>
            <p className="text-textSecondary">
              A portion of your subscription goes to a cause you choose.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#111827] border border-gray-800 p-6 rounded-xl shadow-md hover:scale-105 hover:shadow-xl hover:border-accent transition">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2 text-accent">
              Transparent Results
            </h3>
            <p className="text-textSecondary">
              View results, winners, and prize distribution openly.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
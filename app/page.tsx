export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32">
        <h1 className="text-6xl md:text-7xl font-bold max-w-5xl leading-tight">
          AI Lead Capture & Follow-Up
          <span className="text-gray-400"> for Local Businesses</span>
        </h1>

        <p className="mt-8 text-xl text-gray-400 max-w-2xl">
          Capture more leads, automate follow-ups, and book more clients using AI-powered automation.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
            Start Free Trial
          </button>

          <button className="border border-gray-700 px-6 py-3 rounded-xl hover:bg-white hover:text-black transition">
            Book Demo
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-4">
              AI Chatbot
            </h3>

            <p className="text-gray-400">
              Automatically engage visitors and capture leads 24/7.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-4">
              Instant Follow-Up
            </h3>

            <p className="text-gray-400">
              AI responds instantly so you never lose potential customers.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
            <h3 className="text-2xl font-semibold mb-4">
              Smart Analytics
            </h3>

            <p className="text-gray-400">
              Track conversions, leads, and customer engagement in real time.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-32">
        <div className="max-w-4xl mx-auto bg-white text-black rounded-3xl p-16 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Start Closing More Leads Today
          </h2>

          <p className="text-xl text-gray-700 mb-8">
            Launch your AI-powered lead automation system in minutes.
          </p>

          <button className="bg-black text-white px-8 py-4 rounded-xl font-semibold hover:opacity-90">
            Get Started
          </button>
        </div>
      </section>
    </main>
  );
}
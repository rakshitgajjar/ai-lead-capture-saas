"use client";
export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO */}

      <section className="px-6 py-24 max-w-7xl mx-auto text-center">

        <h1 className="text-6xl font-extrabold leading-tight">
          AI-Powered Lead Capture
          <span className="text-gray-400">
            {" "}for Modern Sales Teams
          </span>
        </h1>

        <p className="text-xl text-gray-400 mt-8 max-w-3xl mx-auto">
          Capture leads, analyze them with AI, and generate
          personalized follow-up emails automatically.
        </p>

        <div className="flex justify-center gap-4 mt-10">

          <a
            href="/signup"
            className="bg-white text-black px-8 py-4 rounded-2xl font-semibold"
          >
            Get Started
          </a>

          <a
            href="/login"
            className="border border-zinc-700 px-8 py-4 rounded-2xl"
          >
            Login
          </a>

        </div>

      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-20">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

            <h3 className="text-2xl font-bold mb-4">
              AI Lead Analysis
            </h3>

            <p className="text-gray-400">
              Automatically analyze every lead with Gemini AI
              and understand buyer intent instantly.
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

            <h3 className="text-2xl font-bold mb-4">
              Smart Follow-Ups
            </h3>

            <p className="text-gray-400">
              Generate personalized outreach emails in seconds
              using AI-powered automation.
            </p>

          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

            <h3 className="text-2xl font-bold mb-4">
              Centralized CRM
            </h3>

            <p className="text-gray-400">
              Manage all your leads, AI summaries,
              and outreach workflows in one dashboard.
            </p>

          </div>

        </div>

      </section>

      {/* PRICING */}

      <section className="max-w-5xl mx-auto px-6 py-24 text-center">

        <h2 className="text-5xl font-bold">
          Simple Pricing
        </h2>

        <p className="text-gray-400 mt-4">
          Start free. Upgrade when you grow.
        </p>

        <div className="mt-14 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 max-w-xl mx-auto">

          <h3 className="text-3xl font-bold">
            Pro Plan
          </h3>

          <p className="text-6xl font-extrabold mt-6">
            $29
            <span className="text-2xl text-gray-400">
              /month
            </span>
          </p>

          <ul className="space-y-4 mt-10 text-gray-300">

            <li>Unlimited Leads</li>
            <li>AI Lead Analysis</li>
            <li>AI Email Generation</li>
            <li>Dashboard Access</li>

          </ul>

          <button
  onClick={async () => {

    try {

      const res = await fetch("/api/create-order", {
        method: "POST",
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "AI Lead Capture SaaS",

        description: "Pro Plan",

        order_id: order.id,

  handler: async function () {

  await fetch("/api/upgrade-user", {
    method: "POST",
  });

  window.location.href = "/payment-success";
},
      };

      const paymentObject = new (window as any).Razorpay(options);

      paymentObject.open();

    } catch (error:unknown) {

      console.log(error);

      alert("Payment failed");
    }
  }}
  className="mt-10 bg-white text-black px-8 py-4 rounded-2xl font-semibold"
>
  Start Free Trial
</button>
         
        </div>

      </section>

    </main>
  );
}
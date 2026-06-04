export default function PaymentSuccessPage() {

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl text-center max-w-xl">

        <h1 className="text-5xl font-bold mb-6">
          Payment Successful 🎉
        </h1>

        <p className="text-gray-400 text-xl mb-8">
          Your Pro account is now activated.
        </p>

        <a
          href="/dashboard"
          className="bg-white text-black px-8 py-4 rounded-2xl font-semibold inline-block"
        >
          Go to Dashboard
        </a>

      </div>

    </main>
  );
}
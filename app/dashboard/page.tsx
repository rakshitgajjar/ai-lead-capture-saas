import Link from "next/link";
import LeadsList from "@/components/LeadsList";
import LeadForm from "@/components/LeadForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white p-8">

      {/* TOP BAR */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">

        <div>
          <h1 className="text-5xl font-extrabold">
            Dashboard
          </h1>

          <p className="text-gray-400 mt-2">
            Welcome back, {user.email}
          </p>
        </div>

        <div className="flex items-center gap-4">

          {profile?.is_pro ? (
            <div className="bg-green-500/20 text-green-400 px-5 py-3 rounded-2xl font-semibold">
              PRO MEMBER
            </div>
          ) : (
            <div className="bg-yellow-500/20 text-yellow-400 px-5 py-3 rounded-2xl font-semibold">
              FREE PLAN
            </div>
          )}

          <form action="/auth/signout" method="post">
            <button className="bg-red-500 px-5 py-3 rounded-2xl font-semibold">
              Logout
            </button>
          </form>

        </div>

      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6 mb-10">

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

          <p className="text-gray-400 text-lg">
            {profile?.is_pro
              ? "Total Leads"
              : "Lead Usage"}
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {profile?.is_pro
              ? `${leads?.length || 0}`
              : `${leads?.length || 0}/5`}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

          <p className="text-gray-400 text-lg">
            AI Analyses
          </p>

          <h2 className="text-5xl font-bold mt-4">
            {leads?.length || 0}
          </h2>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">

          <p className="text-gray-400 text-lg">
            Subscription
          </p>

          <h2 className="text-3xl font-bold mt-5">
            {profile?.is_pro
              ? "Pro Plan"
              : "Free Plan"}
          </h2>

        </div>

      </div>

      {/* FREE PLAN NOTICE */}

      {!profile?.is_pro && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 p-5 rounded-2xl mb-6">

          <h3 className="text-yellow-400 font-bold">
            Free Plan
          </h3>

          <p className="text-gray-300 mt-2">
            You are using {leads?.length || 0}/5 leads.
            Upgrade to Pro for unlimited leads.
          </p>

        </div>
      )}

      {/* LEAD FORM */}

      <div className="mb-10">
        <LeadForm />
      </div>

      {/* LEADS */}

      <LeadsList leads={leads || []} />

      {/* UPGRADE SECTION */}

      {!profile?.is_pro && (
        <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-3xl text-center mt-10">

          <h2 className="text-4xl font-bold mb-5">
            Upgrade to Pro
          </h2>

          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Unlock unlimited leads, AI lead analysis,
            follow-up emails and future CRM features.
          </p>

         <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-4 rounded-2xl font-semibold"
         >
             Upgrade Now
          </Link>
        </div>
      )}

    </main>
  );
}
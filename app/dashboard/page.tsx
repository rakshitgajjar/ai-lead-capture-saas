import LeadsList from "@/components/LeadsList";
import LeadForm from "@/components/LeadForm";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: leads } = await supabase
  .from("leads")
  .select("*")
  .order("created_at", { ascending: false });

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-bold">
          Dashboard
        </h1>

        <form action="/auth/signout" method="post">
          <button className="bg-red-500 px-5 py-3 rounded-xl font-semibold">
            Logout
          </button>
        </form>
      </div>
<LeadForm />
<LeadsList leads={leads || []} />
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl">
        
        <p className="text-xl text-gray-300 mb-4">
          Logged in as:
        </p>

        <p className="text-2xl font-bold">
          {user.email}
        </p>

      </div>

    </main>
  );
}

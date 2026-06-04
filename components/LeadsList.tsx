"use client";

type Lead = {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  ai_summary: string;
  follow_up_email: string;
  lead_score: string;
};

export default function LeadsList({
  leads,
}: {
  leads: Lead[];
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mt-10">

      <h2 className="text-3xl font-bold mb-6">
        Saved Leads
      </h2>

      <div className="space-y-6">

        {leads.map((lead) => (

          <div
            key={lead.id}
            className="border border-zinc-700 rounded-3xl p-6"
          >

            <div className="flex justify-between items-start mb-4">

              <div>
                <h3 className="text-2xl font-bold">
                  {lead.name}
                </h3>

                <p className="text-gray-400">
                  {lead.email}
                </p>

                <p className="text-gray-400">
                  {lead.company}
                </p>
              </div>

              <div
                className={`px-4 py-2 rounded-xl font-semibold ${
                  lead.lead_score === "Hot"
                    ? "bg-red-500/20 text-red-400"
                    : lead.lead_score === "Warm"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-blue-500/20 text-blue-400"
                }`}
              >
                {lead.lead_score || "Pending"}
              </div>

            </div>

            <div className="mb-5">
              <h4 className="font-bold mb-2">
                Lead Message
              </h4>

              <p className="text-gray-300">
                {lead.message}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-2xl p-5 mb-5">

              <h4 className="text-xl font-bold mb-3">
                AI Summary
              </h4>

              <p className="text-gray-300">
                {lead.ai_summary || "Processing..."}
              </p>

            </div>

            <div className="bg-zinc-800 rounded-2xl p-5">

              <h4 className="text-xl font-bold mb-3">
                Follow-up Email
              </h4>

              <p className="text-gray-300 whitespace-pre-wrap">
                {lead.follow_up_email || "Generating email..."}
              </p>

              <button
                onClick={async () => {
                  await fetch("/api/send-email", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      to: lead.email,
                      subject: "Following Up",
                      message: lead.follow_up_email,
                    }),
                  });

                  alert("Email sent!");
                }}
                className="mt-5 bg-white text-black px-5 py-3 rounded-xl font-semibold"
              >
                Send Email
              </button>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}
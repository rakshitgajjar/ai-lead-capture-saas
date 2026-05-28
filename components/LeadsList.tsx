type Lead = {
  id: number;
  name: string;
  email: string;
  company: string;
  message: string;
  ai_summary: string;
  follow_up_email: string;
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

      <div className="space-y-4">

        {leads.map((lead) => (

          <div
            key={lead.id}
            className="border border-zinc-700 rounded-2xl p-5"
          >

            <h3 className="text-2xl font-bold">
              {lead.name}
            </h3>

            <p className="text-gray-400">
              {lead.email}
            </p>

            <p className="text-gray-300 mt-2">
              {lead.company}
            </p>

            <p className="mt-3">
              {lead.message}
            </p>

            <div className="mt-5 p-4 bg-zinc-800 rounded-xl">

              <h4 className="font-bold text-lg mb-2">
                AI Summary
              </h4>

              <p className="text-gray-300">
                {lead.ai_summary || "Processing..."}
              </p>

            </div>

            <div className="mt-4 p-4 bg-zinc-800 rounded-xl">

              <h4 className="font-bold text-lg mb-2">
                Follow-up Email
              </h4>

              <p className="text-gray-300 whitespace-pre-wrap">
                {lead.follow_up_email || "Generating email..."}
              </p>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
}
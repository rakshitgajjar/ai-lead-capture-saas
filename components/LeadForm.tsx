"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LeadForm() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Not logged in");
      return;
    }

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      company,
      message,
      user_id: user.id,
    });

   if (error) {
  alert(error.message);

} else {

  const { data: latestLead } = await supabase
    .from("leads")
    .select("*")
    .order("id", { ascending: false })
    .limit(1)
    .single();

  await fetch("/api/ai-process", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      leadId: latestLead.id,
    }),
  });

  alert("Lead saved and AI processed");

  setName("");
  setEmail("");
  setCompany("");
  setMessage("");
}
  };

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl mb-10">
      
      <h2 className="text-3xl font-bold mb-6">
        Add Lead
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Lead Name"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Lead Email"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <textarea
          placeholder="Lead Message"
          className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold"
        >
          Save Lead
        </button>

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl border border-zinc-800">

        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold"
          >
            Login
          </button>

        </div>
      </div>
    </main>
  );
}
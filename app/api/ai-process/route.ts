import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  try {
    const { leadId } = await req.json();

    const supabase = await createClient();

    const { data: lead, error } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    if (error || !lead) {
      return NextResponse.json(
        { error: "Lead not found" },
        { status: 404 }
      );
    }

    console.log("LEAD FOUND:", lead);

    const ai_summary = "TEST SUMMARY";
    const follow_up_email = "TEST EMAIL";
    const lead_score = "Warm";

    const result = await supabase
      .from("leads")
      .update({
        ai_summary,
        follow_up_email,
        lead_score,
      })
      .eq("id", leadId);

    console.log("UPDATE RESULT:", result);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.log("AI PROCESS ERROR:", error);

    return NextResponse.json(
      { error: true },
      { status: 500 }
    );
  }
}
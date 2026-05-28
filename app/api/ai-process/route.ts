import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@supabase/supabase-js";

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GEMINI_API_KEY!
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { leadId } = body;

    const { data: lead } = await supabase
      .from("leads")
      .select("*")
      .eq("id", leadId)
      .single();

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an AI sales assistant.

Analyze this lead and return:

1. Short lead summary
2. Personalized follow-up email

Lead Info:
Name: ${lead.name}
Company: ${lead.company}
Message: ${lead.message}

Return in this format:

SUMMARY:
...

EMAIL:
...
`;

    const result = await model.generateContent(prompt);

    const response = await result.response.text();

const summaryMatch = response.match(
  /SUMMARY:\s*([\s\S]*?)EMAIL:/
);

const emailMatch = response.match(
  /EMAIL:\s*([\s\S]*)/
);

const summary = summaryMatch?.[1]?.trim() || "";
const followUpEmail = emailMatch?.[1]?.trim() || "";

await supabase
  .from("leads")
  .update({
    ai_summary: summary,
    follow_up_email: followUpEmail,
  })
  .eq("id", leadId);

return NextResponse.json({
  success: true,
});

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,
    });
  }
}
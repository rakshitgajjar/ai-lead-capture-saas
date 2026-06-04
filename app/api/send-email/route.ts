import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      to,
      subject,
      message,
    } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      text: message,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: true },
      { status: 500 }
    );
  }
}
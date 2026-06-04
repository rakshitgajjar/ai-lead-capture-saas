import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {

  try {

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {

      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await supabase
      .from("profiles")
      .update({
        is_pro: true,
      })
      .eq("id", user.id);

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
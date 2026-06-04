import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST() {

  try {

    const order = await razorpay.orders.create({
      amount: 2900 * 100,
      currency: "INR",
      receipt: "receipt_1",
    });

    return NextResponse.json(order);

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
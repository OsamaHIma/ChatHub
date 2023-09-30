import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req, res) {
  const request = await req.json();

  try {
    const { data } = await axios.post(
      `${process.env.BASE_URL}/api/auth/register`,
      request,
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

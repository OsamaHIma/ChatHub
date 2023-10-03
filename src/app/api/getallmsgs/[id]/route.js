import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req, { params: { id } }) {
  try {
    const { data } = await axios.get(
      `${process.env.BASE_URL}/api/messages/getallmsgs/${id}`,
    );

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(error);
  }
}

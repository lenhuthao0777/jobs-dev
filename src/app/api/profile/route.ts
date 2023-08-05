import prisma from "@/lib/prisma";
import { data } from "autoprefixer";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = req.json();
  try {
    // const res = prisma.profile.create(
    //   data: {
    //   }
    // )
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error
    })
  }
}

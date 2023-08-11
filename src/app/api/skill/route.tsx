import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await prisma.skill.findMany();
    return NextResponse.json({
      status: HttpStatusCode.Ok,
      data: res,
      message: "Get skill success!",
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await prisma.skill.create({
      data: {
        name: body?.name,
      },
    });

    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: "Create skill success!",
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    });
  }
}

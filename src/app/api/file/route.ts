import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await prisma.file.create({
      data: {
        name: body?.name,
        url: body?.url,
        width: body?.width,
        height: body?.height,
        userId: body?.userId,
      },
    });

    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: "Upload success!",
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    });
  }
}

import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const query = new URL(req.url);
  try {
    const id = query.searchParams.get("id");

    const res = await prisma.profile.findFirst({
      where: {
        userId: id as string,
      },
    });

    return NextResponse.json({
      status: HttpStatusCode.Ok,
      data: res,
      message: "Get profile success!",
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
    const profile = await prisma.profile.findFirst({
      where: {
        userId: body.userId,
      },
    });

    if (profile) {
      return NextResponse.json({
        status: HttpStatusCode.Conflict,
        message: "Profile is already exist!",
      });
    }

    const res = await prisma.profile.create({
      data: {
        name: body?.name,
        content: body?.content,
        contact: body?.contact,
        avatar: body?.avatar,
        backgroundImage: body?.backgroundImage,
        userId: body.userId,
      },
    });
    return NextResponse.json({
      status: HttpStatusCode.Created,
      data: res,
      message: "Create profile success!",
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    });
  }
}

export async function PUT(req: Request) {
  const body = await req.json();
  try {
    const res = await prisma.profile.update({
      where: {
        id: body?.id,
        userId: body?.userId,
      },
      data: {
        name: body?.name,
        contact: body?.contact,
        content: body?.content,
        avatar: body?.avatar,
        backgroundImage: body?.backgroundImage,
      },
    });

    return NextResponse.json({
      status: HttpStatusCode.Ok,
      data: res,
      message: "Update profile success!",
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    });
  }
}

import { SignInJwtAccessToken } from "@/lib/JWT";
import prisma from "@/lib/prisma";
import { HttpStatusCode } from "axios";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const res = await prisma.user.findFirst({
      where: {
        email: body?.email,
      },
      include: {
        role: true,
        profile: true,
      },
    });

    if (res) {
      const comparePass = await compare(body?.password, res.password);
      if (comparePass) {
        const token = SignInJwtAccessToken({
          email: res.email,
          name: res.name,
        });
        return NextResponse.json({
          status: HttpStatusCode.Ok,
          data: {
            id: res.id,
            name: res?.name,
            email: res.email,
            role: res.role.name,
            accessToken: token,
          },
          message: "Sign Up success!",
        });
      }
    }

    return NextResponse.json({
      status: HttpStatusCode.BadRequest,
      message: "Email or Password is not valid!",
    });
  } catch (error) {
    return NextResponse.json({
      status: HttpStatusCode.InternalServerError,
      message: error,
    });
  }
}

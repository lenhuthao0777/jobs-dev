import { uploadFile } from "@/lib/cloudinary";
import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const res = await uploadFile(body);

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

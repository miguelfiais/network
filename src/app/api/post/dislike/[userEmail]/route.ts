import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface IdPros {
  id: string;
}
export async function DELETE(
  request: Request,
  { params: { userEmail } }: { params: { userEmail: string } }
) {
  const { id } = (await request.json()) as IdPros;

  if (!userEmail) {
    return {
      status: 400,
      body: {
        message: "Missing userEmail",
      },
    };
  }
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  if (!user) {
    return new NextResponse(
      JSON.stringify({
        error: "USER_NOT_FOUND",
      }),
      {
        status: 404,
      }
    );
  }

  const like = await prisma.like.findUnique({
    where: {
      id,
    },
  });
  if (!like) {
    return new NextResponse(
      JSON.stringify({
        error: "LIKE_NOT_FOUND",
      }),
      {
        status: 404,
      }
    );
  }

  if (like.userEmail !== userEmail) {
    return new NextResponse(
      JSON.stringify({
        error: "UNAUTHORIZED",
      }),
      {
        status: 409,
      }
    );
  }

  await prisma.like.delete({
    where: {
      id,
    },
  });

  return new NextResponse(JSON.stringify(like), { status: 200 });
}

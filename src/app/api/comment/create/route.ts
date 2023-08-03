import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface RequestProps {
  content: string;
  postId: string;
  email: string;
}

export async function POST(request: Request) {
  const { content, postId, email } = (await request.json()) as RequestProps;

  if (!email) {
    return new NextResponse(
      JSON.stringify({
        error: "UNAUTHENTICATED",
      }),
      {
        status: 401,
      }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
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

  if (!content) {
    return new NextResponse(
      JSON.stringify({
        error: "COMMENT_INVALID",
      }),
      {
        status: 400,
      }
    );
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    return new NextResponse(
      JSON.stringify({
        error: "POST_NOT_FOUND",
      }),
      {
        status: 404,
      }
    );
  }

  const newComment = await prisma.comment.create({
    data: {
      content,
      postId,
      userEmail: email,
    },
  });

  return new NextResponse(
    JSON.stringify({
      success: true,
      newComment,
    })
  );
}

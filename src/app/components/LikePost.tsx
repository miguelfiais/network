"use client";

import { Like } from "@prisma/client";
import { useSession } from "next-auth/react";
import { AiFillLike } from "react-icons/ai";

interface LikePostProps {
  postId: string;
  liked: Like[];
}

const LikePost = ({ postId, liked }: LikePostProps) => {
  const { data, status } = useSession();

  if (status !== "authenticated") return null;

  const likePost = async () => {
    await fetch("/api/post/like", {
      method: "POST",
      body: JSON.stringify({
        userEmail: data?.user?.email,
        postId,
      }),
    });
  };

  let likeId: string;
  const iLiked = liked.filter((like) => like.userEmail === data.user?.email);
  iLiked.map((like) => (likeId = like.id));

  const dislike = async () => {
    await fetch(`/api/post/dislike/${data.user?.email}`, {
      method: "DELETE",
      body: JSON.stringify({
        id: likeId,
      }),
    });
  };

  return (
    <div>
      {iLiked.length > 0 ? (
        <button className="flex items-end mt-1 mb-3" onClick={dislike}>
          <AiFillLike size={20} color="#0b60f1" />
          <span className="text-xs font-medium text-blue-400">Curtido</span>
        </button>
      ) : (
        <button className="flex items-end mt-1 mb-3" onClick={likePost}>
          <AiFillLike size={20} color="#9ca3af" />
          <span className="text-xs font-medium text-gray-400">Curtir</span>
        </button>
      )}
    </div>
  );
};

export default LikePost;

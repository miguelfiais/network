"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ItemPost from "../components/ItemPost";

interface ItemPostProps {
  User: {
    name: string | null;
    image: string | null;
  };
  id: string;
  content: string;
  created_at: Date;
  comments: {}[];
  likes: {
    id: string;
    created_at: Date;
    updated_at: Date;
    postId: string;
    userEmail: string;
  }[];
}

const MyPosts = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<ItemPostProps[]>([]);

  const fetchMyPosts = async () => {
    const response = await fetch(`/api/post/me/${data?.user?.email}`);
    const posts = (await response.json()) as ItemPostProps[];
    setPosts(posts);
  };

  useEffect(() => {
    if (status === "unauthenticated") return router.push("/");
    fetchMyPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return (
    <div className="bg-gray-100 h-[calc(100vh-74.29px)] overflow-y-auto">
      <div className="container mx-auto p-5">
        {posts.length > 0 &&
          posts.map((post) => <ItemPost data={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default MyPosts;

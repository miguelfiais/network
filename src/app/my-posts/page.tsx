"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ItemPost from "../components/ItemPost";

interface ItemPostProps {
  User: {
    id: string;
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
    const response = await fetch(`/api/post/user/${data?.user?.email}`);
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
      <div className="relative w-full h-1/5">
        <Image
          src="/capa.png"
          alt="foto de capa"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="container mx-auto p-5 -mt-10 relative flex items-center gap-3 pb-0">
        <Image
          src={data?.user?.image!}
          alt={data?.user?.name!}
          width={120}
          height={120}
          className="rounded-full border-2 border-blue-400"
        />
        <div>
          <p className="font-bold text-gray-700 text-lg">{data?.user?.name}</p>
          <p>
            <p className="text-gray-500">{posts.length} Publicações</p>
          </p>
        </div>
      </div>
      <div className="p-5">
        {posts.length > 0 &&
          posts.map((post) => <ItemPost data={post} key={post.id} />)}
      </div>
    </div>
  );
};

export default MyPosts;

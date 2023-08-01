"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

const NewPost = () => {
  const { data } = useSession();

  if (!data?.user) return null;

  return (
    <div className="max-w-2xl w-full shadow-md relative p-5 rounded-xl bg-white">
      <h2 className="w-full pb-2 border-b mb-2 text-sm font-semibold text-gray-700">
        Publique alguma coisa
      </h2>
      <div className="flex items-start gap-2">
        <Image
          src={data?.user?.image!}
          alt={data?.user?.name!}
          width={40}
          height={40}
          className="rounded-md"
        />
        <textarea
          placeholder="O que você está pensando?"
          className="outline-none w-full h-20 mb-5 resize-none text-xs"
        ></textarea>
      </div>
      <button className="absolute bottom-3 right-3 py-2 px-4 bg-blue-500 rounded-lg text-white text-xs">
        Publicar
      </button>
    </div>
  );
};

export default NewPost;

"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as yup from "yup";

type FormProps = {
  content: string;
};

const schema = yup
  .object({
    content: yup.string().required(),
  })
  .required();

const NewPost = () => {
  const { data, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (formData: FormProps) => {
    await fetch("/api/post/create", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          email: data?.user?.email,
          content: formData.content,
        })
      ),
    });
  };

  if (status !== "authenticated") return null;

  return (
    <div className="w-full shadow-md relative p-5 rounded-xl bg-white container mx-auto">
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
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <textarea
            {...register("content")}
            placeholder="O que você está pensando?"
            className="outline-none w-full h-20 mb-5 resize-none text-xs"
          />
          <p className="text-xs text-red-500 w-max">
            {errors.content?.message}
          </p>
          <button
            className="absolute bottom-3 right-3 py-2 px-4 bg-blue-500 rounded-lg text-white text-xs"
            type="submit"
          >
            Publicar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPost;

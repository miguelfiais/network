"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { IoIosSend } from "react-icons/io";
import * as yup from "yup";

interface newCommentProps {
  postId: string;
}
type FormProps = {
  content: string;
};

const schema = yup
  .object({
    content: yup.string().required("Digite alguma coisa"),
  })
  .required();

const NewComment = ({ postId }: newCommentProps) => {
  const { data, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: FormProps) => {
    await fetch("http://localhost:3000/api/comment/create", {
      method: "POST",
      body: Buffer.from(
        JSON.stringify({
          email: data?.user?.email,
          content: formData.content,
          postId,
        })
      ),
    });
  };

  if (status !== "authenticated") return null;

  return (
    <div className="flex gap-2">
      <Image
        src={data.user?.image!}
        alt={data.user?.name!}
        width={32}
        height={32}
        className="rounded-md"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full gap-1 relative"
      >
        <textarea
          className="w-full outline-none border rounded-md pl-1 text-xs resize-none"
          placeholder="Comente alguma coisa..."
          {...register("content")}
        />
        <p className="text-xs text-red-500 w-max absolute top-8 left-1">
          {errors.content?.message}
        </p>
        <button type="submit">
          <IoIosSend size={24} color="#3b82f6" />
        </button>
      </form>
    </div>
  );
};

export default NewComment;

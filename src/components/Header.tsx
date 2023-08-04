"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";

const Header = () => {
  const { status, data } = useSession();
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenu = () => setMenuIsOpen(!menuIsOpen);

  const login = () => signIn();
  const logout = () => signOut();
  return (
    <div className="container mx-auto p-5 flex items-center justify-between">
      <Link
        href="/"
        className="flex items-center gap-1 font-bold text-blue-500"
      >
        <Image src="/logo.png" alt="logo" width={40} height={34.29} />
        NETWORK
      </Link>

      {}
      {status === "unauthenticated" && <button onClick={login}>Login</button>}
      {status === "authenticated" && (
        <div className="flex items-center gap-1 relative">
          <Image
            src={data?.user?.image!}
            alt={data?.user?.name!}
            width={32}
            height={32}
            className="rounded-lg"
          />
          <p className="font-medium">{data?.user?.name}</p>

          <button onClick={handleMenu} className="cursor-pointer">
            <MdOutlineArrowDropDown size={24} />
          </button>

          {menuIsOpen && (
            <div className="absolute top-9 left-0 z-50 w-full bg-gray-400 p-2 flex flex-col gap-2">
              <button
                className=" text-sm font-semibold w-full bg-white rounded-lg shadow-md py-1 px-2"
                onClick={logout}
              >
                Logout
              </button>
              <Link
                href={"/my-posts"}
                className=" text-sm font-semibold w-full bg-white rounded-lg shadow-md py-1 px-2 text-center"
              >
                Minhas publicações
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

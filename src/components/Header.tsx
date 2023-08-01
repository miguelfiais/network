"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
      <Image src="/logo.png" alt="logo" width={80} height={50} />
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
            <button
              className="absolute top-10 left-0 z-50 text-sm font-semibold w-full h-full bg-white rounded-lg shadow-md"
              onClick={logout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;

"use client";

import React, { useEffect, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (!session && pathname !== "/") {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="flex items-start justify-end">
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="flex gap-1 items-center font-medium text-xl transition-colors hover:text-zinc-700"
        >
          <AiFillGoogleCircle size={30} />
          Войти
        </button>
      ) : (
        <div className="relative flex justify-between">
          {pathname === "/profile" ? (
            <MdOutlineKeyboardBackspace
              size={30}
              className="text-zinc-700 transition-colors hover:text-zinc-400"
              onClick={() => router.push("/")}
            />
          ) : pathname === "/profile/new" ? (
            <MdOutlineKeyboardBackspace
              size={30}
              className="text-zinc-700 transition-colors hover:text-zinc-400"
              onClick={() => router.push("/profile")}
            />
          ) : (
            <div></div>
          )}

          <div
            className={`flex gap-1 items-end cursor-pointer rounded-lg px-2 py-1 bg-zinc-300 transition-all hover:bg-zinc-400 ${
              isDropdownOpen && "rounded-br-none"
            }`}
            onClick={toggleDropdown}
          >
            <Image
              src={String(session.user?.image)}
              width={35}
              height={35}
              alt="avatar"
              className="border-zinc-500 border-2 rounded-md"
            />
            <div className="text-lg">{session.user?.name}</div>
          </div>
          {isDropdownOpen && (
            <div className="absolute top-[43px] right-0 rounded-b-lg bg-zinc-300 shadow-lg">
              <Link
                href="/profile"
                className="block w-full px-4 py-1 text-center hover:bg-zinc-400"
              >
                Профиль
              </Link>
              <button
                onClick={toggleDropdown}
                className="block w-full px-4 py-1 text-center hover:bg-zinc-400"
              >
                Лайки
              </button>
              <button
                onClick={() => {
                  signOut();
                }}
                className="block w-full px-4 py-1 text-center rounded-b-lg hover:bg-zinc-400"
              >
                Выход
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Nav;

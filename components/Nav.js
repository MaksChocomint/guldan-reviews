"use client";

import React, { useEffect, useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const style = useSelector((state) => state.styles);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleRoute = () => {
    if (pathname === "/profile") {
      router.push("/");
    } else if (pathname === "/profile/new") {
      router.push("/profile");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (!session && pathname !== "/") {
      router.push("/");
    }
  }, [session]);

  return (
    <div className="relative z-[200] flex items-start justify-end w-full">
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="flex gap-1 items-center font-medium text-xl transition-colors hover:text-zinc-700"
        >
          <AiFillGoogleCircle size={30} />
          Войти
        </button>
      ) : (
        <div className="relative flex justify-between w-full">
          {pathname !== "/" ? (
            <MdOutlineKeyboardBackspace
              size={30}
              className={`${style.text} transition-colors hover:text-zinc-500 cursor-pointer`}
              onClick={handleRoute}
            />
          ) : (
            <div></div>
          )}

          <div
            className={`flex gap-1 items-end cursor-pointer rounded-lg px-2 py-1 ${
              style.foreground.slice(0, -3) +
              (Number(style.foreground.slice(-3)) + 100)
            } transition-all ${style.btnHover} ${
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
            <div
              className={`absolute top-[43px] right-0 rounded-b-lg ${style.foreground} shadow-lg`}
            >
              <Link
                href="/profile"
                className={`block w-full px-4 py-1 text-center ${style.optionHover}`}
              >
                Профиль
              </Link>
              <Link
                href="/profile/liked"
                className={`block w-full px-4 py-1 text-center ${style.optionHover}`}
              >
                Любимые
              </Link>
              <Link
                href="/profile/settings"
                className={`block w-full px-4 py-1 text-center ${style.optionHover}`}
              >
                Настройки
              </Link>
              <button
                onClick={() => {
                  signOut();
                }}
                className={`block w-full px-4 py-1 text-center rounded-b-lg ${style.optionHover}`}
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

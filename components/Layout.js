"use client";

import { Jost } from "next/font/google";
import Nav from "./Nav";
const jost = Jost({ subsets: ["latin", "cyrillic"] });

const Layout = ({ children }) => {
  return (
    <main className={jost.className}>
      <div className=" bg-zinc-300 h-full">
        <div className="bg-zinc-200 h-full min-h-screen py-3 px-10 mx-32 ">
          <Nav />
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;

"use client";
import { useSelector } from "react-redux";
import Nav from "./Nav";

const Layout = ({ children }) => {
  const style = useSelector((state) => state.styles); // Используйте Redux для получения стилей

  return (
    <main>
      <div className={`h-full ${style.background} ${style.text}`}>
        <div
          className={`h-full min-h-screen py-3 px-10 mx-32 ${style.foreground}`}
        >
          <Nav />
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;

import Provider from "@/context/provider";
import "./globals.css";
import { Jost } from "next/font/google";
import mongooseConnect from "@/lib/mongoose";
import { Review } from "@/models/Review";
import ReduxProvider from "@/context/reduxProvider";

mongooseConnect();

const jost = Jost({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Рецензии Гул'дана",
  description: "Рецензии на аниме, фильмы и сериалы, озвученные Гул'даном",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={jost.className}>
        <ReduxProvider>
          <Provider>{children}</Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}

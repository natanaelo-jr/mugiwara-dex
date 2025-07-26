"use client";
import { useEffect } from "react";
import { verifyLogin, login } from "@/features/auth";
import TitleBar from "@/components/layout/TitleBar";

export default function Home() {
  const imgurl =
    "https://static.wikia.nocookie.net/onepiece/images/a/a9/Monkey_D._Luffy_Portrait.png/revision/latest/";
  useEffect(() => {
    verifyLogin();
  });
  return (
    <div className="w-full h-full flex flex-1 flex-col">
      <TitleBar />
    </div>
  );
}

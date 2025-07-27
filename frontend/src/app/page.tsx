"use client";
import { useEffect } from "react";
import { verifyLogin, login } from "@/features/auth";
import TitleBar from "@/components/layout/TitleBar";
import { Input } from "@/components/ui/input";

export default function Home() {
  const imgurl =
    "https://static.wikia.nocookie.net/onepiece/images/a/a9/Monkey_D._Luffy_Portrait.png/revision/latest/";
  useEffect(() => {
    verifyLogin();
  });
  return (
    <div className="w-full h-full flex flex-1 flex-col">
      <TitleBar />
      <div className="w-full h-full flex items-center justify-center">
        <div className="p-4 bg-beige-dark">
          <Input placeholder="placeholder" variant="default"></Input>
        </div>
      </div>
    </div>
  );
}

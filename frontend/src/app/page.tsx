"use client";
import { useEffect } from "react";
import { verifyLogin } from "@/features/auth";
import TitleBar from "@/components/layout/TitleBar";
import CardTable from "@/components/cards/CardTable";

export default function Home() {
  const imgurl =
    "https://static.wikia.nocookie.net/onepiece/images/a/a9/Monkey_D._Luffy_Portrait.png/revision/latest/";
  useEffect(() => {
    verifyLogin();
  });
  return (
    <div className="w-full h-full flex flex-col">
      <TitleBar />
      <div className="w-full flex-1 min-h-0 max-h-screen flex flex-col items-center">
        <CardTable />
      </div>
    </div>
  );
}

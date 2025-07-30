"use client";
import TitleBar from "@/components/layout/TitleBar";
import CardTable from "@/components/cards/CardTable";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <TitleBar />
      <div className="w-full flex-1 min-h-0 max-h-screen flex flex-col items-center">
        <CardTable />
      </div>
    </div>
  );
}

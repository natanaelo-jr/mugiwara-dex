import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1 className="font-op text-8xl">MUGIWARA DEX</h1>
      <Image
        src="https://static.wikia.nocookie.net/onepiece/images/a/a9/Monkey_D._Luffy_Portrait.png/"
        alt="luffy picture"
        fill
      />
    </div>
  );
}

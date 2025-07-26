import Link from "next/link";
import Animation from "../Anims";
import { Button } from "../ui/button";

const TitleBar: React.FC = () => {
  return (
    <div className="w-full relative flex justify-center items-center py-10 ">
      <Link href="/">
        <h1 className="font-op text-6xl text-brown">MUGIWARA DEX</h1>
      </Link>
      <div className="absolute flex items-center right-5">
        <Animation animation="shake">
          <Link href="/login/">
            <Button>Login</Button>
          </Link>
        </Animation>
      </div>
    </div>
  );
};

export default TitleBar;

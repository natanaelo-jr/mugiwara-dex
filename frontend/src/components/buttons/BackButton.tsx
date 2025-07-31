import Link from "next/link";
import Animation from "../Anims";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC = () => {
  return (
    <div>
      <Link href="/">
        {/* <Animation animation="grow"> */}
        <Button
          variant="inv"
          className="text-zinc-800 p-0 w-10 h-10 bg-zinc-300 rounded-sm hover:bg-zinc-800 hover:text-purple-600"
        >
          <ArrowLeft />
        </Button>
        {/* </Animation> */}
      </Link>
    </div>
  );
};

export default BackButton;

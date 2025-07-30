import Link from "next/link";
import Animation from "../Anims";
import { Button } from "../ui/button";
import { useAuthStore } from "@/store/auth";
import { logOut, verifyLogin } from "@/features/auth";
import { useEffect } from "react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const TitleBar: React.FC = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isLoading = useAuthStore((s) => s.isLoading);
  const router = useRouter();
  const onLogout = () => {
    logOut();
    router.push("/");
  };

  useEffect(() => {
    verifyLogin();
  }, [isAuthenticated]);

  const user = useAuthStore((s) => s.user);
  return (
    <div className="w-full relative flex justify-center items-center py-10 ">
      <Link href="/">
        <h1 className="font-op text-6xl text-brown">MUGIWARA DEX</h1>
      </Link>
      <div className="absolute flex items-center right-5">
        {!isLoading && !isAuthenticated && (
          <Animation animation="shake">
            <Link href="/login/">
              <Button>Login</Button>
            </Link>
          </Animation>
        )}
        {user && isAuthenticated && (
          <div className="flex items-center text-brown">
            <p className="font-pirate text-xl">Olá, {user.username}</p>
            <Button onClick={onLogout} variant="inv" className="text-2xl">
              <Settings />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TitleBar;

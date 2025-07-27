import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
interface cardProps {
  imgurl: string;
  text: string;
  destination: string;
}

const Card: React.FC<cardProps> = ({ imgurl, text, destination }) => {
  return (
    <motion.div
      initial={{ scale: 1 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: [0, 5, -5, 5, -5, 0] }}
    >
      <Link href={destination}>
        <div className="flex w-fit bg-zinc-300 group hover:bg-amber-200 duration-300 hover:cursor-pointer transition-colors p-2 rounded-lg flex-col items-center">
          <div className="w-40 h-40 relative overflow-hidden rounded-sm">
            <Image
              src={imgurl}
              alt=""
              className="w-max-40 h-max-40 rounded-sm"
              loading="eager"
              fill
            />
          </div>
          <span className="font-pirate group-hover:scale-110 text-zinc-900">
            {text}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;

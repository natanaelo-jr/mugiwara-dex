"use client";
import { motion, Variants } from "framer-motion";

const animations: Record<string, Variants> = {
  shake: {
    anim: { scale: 1, rotate: 0 },
    hover: { scale: 1, rotate: [0, 5, -5, 5, -5, 0] },
  },
  fade: { anim: { opacity: 0 }, hover: { opacity: 1 } },
  grow: { anim: { scale: 1 }, hover: { scale: 1.1 } },
};

interface Props {
  children: React.ReactNode;
  animation: string;
}

const Animation: React.FC<Props> = ({ children, animation }) => {
  const selected = animations[animation] ?? {};
  return (
    <motion.div
      variants={selected}
      initial={selected?.init ? "init" : {}}
      animate={selected?.anim ? "anim" : {}}
      whileHover={selected?.hover ? "hover" : {}}
    >
      {children}
    </motion.div>
  );
};
export default Animation;

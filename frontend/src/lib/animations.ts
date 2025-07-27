export const animationVariants = {
  shakeOnHover: {
    init: {
      scale: 1,
      rotate: 0,
    },
    anim: { rotate: 0, scale: 1 },
    hover: {
      scale: 1.1,
      rotate: [0, 10, -10, 10, 0],
      transition: {
        stiffness: 400,
        damping: 10,
      },
    },
  },

  growOnHover: {
    initial: {
      scale: 1,
      rotate: 0, // ⬅️ ADICIONADO: Garante consistência
    },
    hover: {
      scale: 1.1,
    },
  },
};

export const animationVariants = {
  shakeOnHover: {
    initial: {
      scale: 1,
      rotate: 0,
    },
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

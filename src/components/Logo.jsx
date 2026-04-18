import React from 'react';
import { motion } from 'framer-motion';
import logoSrc from '../assets/Logo.png';

const Logo = () => {
  return (
    <motion.div
      className="flex items-center cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={logoSrc}
        alt="Tapan Vachhani Logo"
        className="h-16 md:h-20 w-auto object-contain"
      />
    </motion.div>
  );
};

export default Logo;

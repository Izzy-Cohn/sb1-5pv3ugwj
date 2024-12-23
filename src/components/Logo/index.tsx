import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div 
      className="flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
      <img
        src="/logo.svg"
        alt="News on Shoes Logo"
        className="h-48 w-48"
      />
    </motion.div>
  );
}
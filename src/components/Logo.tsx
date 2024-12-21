import { motion } from 'framer-motion';

export function Logo() {
  return (
    <motion.div 
      className="flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <img
        src="/logo.png"
        alt="News on Shoes Logo"
        className="h-12 w-12"
      />
      <span className="ml-2 text-xl font-bold text-gray-900">ShoeSpot</span>
    </motion.div>
  );
}
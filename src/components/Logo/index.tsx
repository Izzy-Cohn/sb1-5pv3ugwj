import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Logo() {
  return (
    <motion.div
      className="flex items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Link to="/" className="block">
        <img
          src="/logo.svg"
          alt="News on Shoes Logo"
         className="w-24 h-24 md:w-36 md:h-36 lg:w-52 lg:h-52"
        />
      </Link>
    </motion.div>
  );
}
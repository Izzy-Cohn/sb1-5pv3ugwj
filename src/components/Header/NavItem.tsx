import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface NavItemProps {
  title: string;
  href: string;
}

export function NavItem({ title, href }: NavItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
    >
      <Link
        to={href}
        className="text-gray-700 hover:text-secondary transition-colors"
      >
        {title}
      </Link>
    </motion.div>
  );
}
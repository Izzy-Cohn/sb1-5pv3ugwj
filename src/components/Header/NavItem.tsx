import { motion } from 'framer-motion';

interface NavItemProps {
  title: string;
  href: string;
}

export function NavItem({ title, href }: NavItemProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      className="text-gray-700 hover:text-secondary transition-colors"
    >
      {title}
    </motion.a>
  );
}
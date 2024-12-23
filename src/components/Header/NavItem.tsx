import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { DropdownMenu } from './DropdownMenu';

interface NavItemProps {
  title: string;
  href: string;
}

export function NavItem({ title, href }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSneakersDropdown = title === 'Sneakers';

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Link
        to={href}
        className="text-gray-700 hover:text-secondary transition-colors"
      >
        {title}
      </Link>
      {hasSneakersDropdown && <DropdownMenu isOpen={isOpen} />}
    </motion.div>
  );
}
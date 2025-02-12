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
  const hasDropdown = title === 'Sneakers' || title === 'Not Just Shoes';

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
      {hasDropdown && <DropdownMenu isOpen={isOpen} category={title} />}
    </motion.div>
  );
}
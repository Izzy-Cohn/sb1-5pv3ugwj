import { motion } from 'framer-motion';
import { NavItem } from './NavItem';
import { Logo } from '../Logo';

const navItems = [
  { title: 'Sneakers', href: '/sneakers' },
  { title: 'Sandals', href: '/sandals' },
  { title: 'Slippers', href: '/slippers' },
  { title: 'Shoes', href: '/shoes' },
];

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/100 backdrop-blur-sm shadow-sm z-50 h-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute top-0 left-30 h-32 w-32 rounded-full bg-white/100 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Logo />
          </div>
          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

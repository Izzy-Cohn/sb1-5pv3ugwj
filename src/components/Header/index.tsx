import { motion } from 'framer-motion';
import { NavItem } from './NavItem';
import { Logo } from '../Logo';

const navItems = [
  { title: 'Sneakers', href: '/sneakers' },
  { title: 'Sandals', href: '/sandals' },
  { title: 'Slippers', href: '/slippers' },
  { title: 'Shoes', href: '/shoes' },
  { title: 'Not Just Shoes', href: '/not-just-shoes' },
];

export function Header() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/100 backdrop-blur-sm shadow-sm z-50 h-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center relative h-full">
          <div className="fixed top-0 left-8 h-20 w-20 md:h-28 md:w-28 lg:h-36 lg:w-36 rounded-full bg-white/100 backdrop-blur-sm flex items-center justify-center shadow-sm">
            <Logo />
          </div>
          <div className="flex-1 flex justify-center h-full">
            <nav className="hidden md:flex space-x-8 items-center h-full">
              {navItems.map((item) => (
                <NavItem key={item.href} {...item} />
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* Admin link fixed to the right side */}
      <div className="hidden md:flex fixed right-8 top-0 h-16 items-center">
        <NavItem title="Admin" href="/admin" />
      </div>
    </motion.header>
  );
}

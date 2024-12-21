import { motion } from 'framer-motion';
import { NavItem } from './NavItem';
import { Logo } from '../Logo';

const navItems = [
  { title: 'Men', href: '/men' },
  { title: 'Women', href: '/women' },
  { title: 'Kids', href: '/kids' },
  { title: 'Sale', href: '/sale' },
];

export function Header() {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
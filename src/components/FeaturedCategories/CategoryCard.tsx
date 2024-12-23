import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function CategoryCard({ icon: Icon, title, description, index }: CategoryCardProps) {
  return (
    <Link to={`/${title.toLowerCase()}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.2 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
      >
        <Icon className="w-12 h-12 text-primary mb-4" />
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </motion.div>
    </Link>
  );
}
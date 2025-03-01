import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { recommendations, notJustShoesRecommendations } from '../Recommendations/recommendations';

interface DropdownMenuProps {
  isOpen: boolean;
  category: string;
}

export function DropdownMenu({ isOpen, category }: DropdownMenuProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0 }
  };

  const getRecommendations = () => {
    switch (category.toLowerCase()) {
      case 'not just shoes':
        return notJustShoesRecommendations;
      default:
        return recommendations;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 w-64 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg py-2"
        >
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
          >
            {getRecommendations().map((recommendation) => (
              <motion.div key={recommendation.slug} variants={item}>
                <Link
                  to={`/${category.toLowerCase().replace(/\s+/g, '-')}/recommendations/${recommendation.slug}`}
                  className="block px-3 py-1 text-xs text-gray-700 hover:bg-gray-50/50 hover:text-secondary transition-colors"
                >
                  {recommendation.title}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
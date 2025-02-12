import { motion } from 'framer-motion';
import { Medal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface RankingItemProps {
  rank: number;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  price: string;
  index: number;
}

export function RankingItem({ rank, name, brand, description, imageUrl, price, index }: RankingItemProps) {
  const { slug, category } = useParams();
  const isInsertCategory = slug === 'best-inserts';
  const formattedCategory = category?.toLowerCase().replace(/\s+/g, '-');
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  
  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1: return 'text-yellow-400';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-6 bg-white rounded-lg shadow-sm p-6 relative"
    >
      {!isInsertCategory && (
        <div className="absolute -left-4 top-6 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
          {rank}
        </div>
      )}
      
      <div className="w-48 h-48 flex-shrink-0">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <p className="text-gray-600 font-medium">{brand}</p>
          </div>
          {!isInsertCategory && rank <= 3 && (
            <Medal className={`w-6 h-6 ${getMedalColor(rank)}`} />
          )}
        </div>

        <p className="mt-4 text-gray-700">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">{price}</span>
          <Link to={`/${formattedCategory}/rankings/${slug}/${formattedName}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
            >
              View Details
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
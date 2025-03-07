import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface RecommendationItemProps {
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  price: string;
  amazonUrl?: string;
  index: number;
  rank?: number; // Keep as optional for backward compatibility
}

export function RecommendationItem({ 
  name, 
  brand, 
  description, 
  imageUrl, 
  price, 
  amazonUrl,
  index 
}: RecommendationItemProps) {
  const { slug, category } = useParams();
  const formattedName = name.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex gap-6 bg-white rounded-lg shadow-sm p-6 relative"
    >
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
        </div>

        <p className="mt-4 text-gray-700">{description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-primary">{price}</span>
          <div className="flex gap-2">
            {amazonUrl && (
              <a href={amazonUrl} target="_blank" rel="noopener noreferrer">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#f3a736] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Buy on Amazon
                </motion.button>
              </a>
            )}
            <Link to={`/${category}/recommendations/${slug}/${formattedName}`}>
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
      </div>
    </motion.div>
  );
} 
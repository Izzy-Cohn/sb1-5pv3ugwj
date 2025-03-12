import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';

interface RecommendationCardProps {
  title: string;
  slug: string;
  index: number;
}

export function RecommendationCard({ title, slug, index }: RecommendationCardProps) {
  const { category } = useParams();
  const formattedCategory = category?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <Link to={`/${formattedCategory}/recommendations/${slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all"
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <p className="mt-2 text-gray-600">
            Expert-curated recommendations based on extensive testing and research
          </p>
        </div>
      </motion.div>
    </Link>
  );
} 
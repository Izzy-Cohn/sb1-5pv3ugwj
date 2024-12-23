import { motion } from 'framer-motion';
import type { ProductFeature } from '../../types/product';

interface FeaturesProps {
  features: ProductFeature[];
}

export function Features({ features }: FeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex gap-6"
        >
          <img
            src={feature.imageUrl}
            alt={feature.title}
            className="w-24 h-24 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
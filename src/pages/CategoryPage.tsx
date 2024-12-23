import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categories } from '../components/FeaturedCategories/categories';

export function CategoryPage() {
  const { category } = useParams();
  const categoryData = categories.find(
    (c) => c.title.toLowerCase() === category?.toLowerCase()
  );

  if (!categoryData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Category not found</h1>
      </div>
    );
  }

  const Icon = categoryData.icon;

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] flex items-center justify-center bg-[#43b9c7]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white z-10"
        >
          <Icon className="w-20 h-20 mx-auto mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            {categoryData.title}
          </h1>
          <p className="text-xl text-gray-900 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
            {categoryData.description}
          </p>
        </motion.div>
      </div>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <img
                src={`https://images.unsplash.com/photo-${1550399105 + index}?auto=format&fit=crop&q=80`}
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product {index + 1}</h3>
                <p className="text-gray-600 text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-opacity-90 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
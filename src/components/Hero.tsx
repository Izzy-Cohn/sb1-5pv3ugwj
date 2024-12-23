import { motion } from 'framer-motion';

interface HeroProps {
  onExplore: () => void;
}

export function Hero({ onExplore }: HeroProps) {
  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-[#43b9c7]">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      
      <motion.div 
        className="relative text-center z-10 max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
          Pick the Right Pair
        </h1>
        <p className="text-xl md:text-2xl text-gray-900 font-medium mb-8 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
          Expert guidance for every step of your journey
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExplore}
          className="bg-primary text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
        >
          Explore Recommendations
        </motion.button>
      </motion.div>
    </div>
  );
}
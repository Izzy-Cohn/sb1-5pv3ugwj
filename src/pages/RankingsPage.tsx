import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RankingItem } from '../components/Rankings/RankingsList/RankingItem';
import { rankingsData } from '../components/Rankings/RankingsList/rankingsData';
import { Award } from 'lucide-react';

export function RankingsPage() {
  const { slug } = useParams();
  const rankingData = slug ? rankingsData[slug] : null;

  if (!rankingData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Ranking not found</h1>
      </div>
    );
  }

  const isInsertCategory = slug === 'best-inserts';

  return (
    <div className="pt-16">
      <div className="relative h-[40vh] flex items-center justify-center bg-[#43b9c7]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white z-10"
        >
          <Award className="w-20 h-20 mx-auto mb-4 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            {rankingData.title}
          </h1>
          <p className="text-xl text-gray-900 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
            {isInsertCategory ? 'Expert-Tested Picks' : 'Top 10 Expert-Tested Picks'}
          </p>
        </motion.div>
      </div>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="space-y-8">
          {rankingData.items.map((item, index) => (
            <RankingItem
              key={index}
              {...item}
              rank={index + 1}
              index={index}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
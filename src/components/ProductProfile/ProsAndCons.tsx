import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface ProsAndConsProps {
  pros: string[];
  cons: string[];
}

export function ProsAndCons({ pros, cons }: ProsAndConsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-green-50 p-6 rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-4 text-green-800">Pros</h3>
        <ul className="space-y-3">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-green-900">{pro}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-red-50 p-6 rounded-lg"
      >
        <h3 className="text-lg font-semibold mb-4 text-red-800">Cons</h3>
        <ul className="space-y-3">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2">
              <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-red-900">{con}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
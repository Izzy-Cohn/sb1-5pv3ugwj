import { motion } from 'framer-motion';

interface VideoReviewProps {
  videoId: string;
}

export function VideoReview({ videoId }: VideoReviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="aspect-video w-full rounded-lg overflow-hidden"
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Product Review"
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </motion.div>
  );
}
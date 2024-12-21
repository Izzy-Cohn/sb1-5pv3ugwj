import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useInfiniteVideos } from '../hooks/useInfiniteVideos';
import { Video } from '../types/youtube';

export function VideoList() {
  const { ref, inView } = useInView();
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteVideos();

  const allVideos = data?.pages.flatMap((page) => page.items) ?? [];

  if (isLoading) {
    return <VideoSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="sticky top-20 h-[calc(100vh-5rem)]">
        {allVideos[0] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full rounded-lg overflow-hidden"
          >
            <img 
              src={allVideos[0].thumbnail}
              alt={allVideos[0].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </div>

      <div className="space-y-4 overflow-auto h-[calc(100vh-5rem)]">
        {allVideos.map((video: Video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 bg-white rounded-lg shadow-sm cursor-pointer"
          >
            <h3 className="font-semibold text-lg">{video.title}</h3>
            <p className="text-gray-600 text-sm mt-2">{video.description}</p>
          </motion.div>
        ))}
        
        {hasNextPage && (
          <div ref={ref} className="h-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#40E0D0]" />
          </div>
        )}
      </div>
    </div>
  );
}

function VideoSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
      <div className="animate-pulse bg-gray-200 h-[calc(100vh-5rem)] rounded-lg" />
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageGallery } from '../components/ProductProfile/ImageGallery';
import { Features } from '../components/ProductProfile/Features';
import { ProsAndCons } from '../components/ProductProfile/ProsAndCons';
import { VideoReview } from '../components/ProductProfile/VideoReview';
import { rankingsData } from '../components/Rankings/RankingsList/rankingsData';

export function ProductPage() {
  const { category, productId } = useParams();
  
  // TODO: Replace with actual data fetching
  const product = {
    id: '1',
    name: 'UltraSupport X-1',
    brand: 'StrideTech',
    description: 'Revolutionary arch support system with adaptive cushioning.',
    longDescription: `The UltraSupport X-1 represents the pinnacle of comfort and support technology. 
    Designed with advanced biomechanics in mind, this shoe delivers exceptional stability and cushioning 
    for those who need it most. The revolutionary arch support system adapts to your foot's unique shape, 
    while the medical-grade orthotic inserts provide unparalleled comfort.`,
    price: '$189.99',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
      'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329'
    ],
    features: [
      {
        title: 'Adaptive Cushioning',
        description: 'Smart foam technology that adjusts to your stride and weight.',
        imageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782'
      },
      {
        title: 'Stability Control',
        description: 'Advanced support system that prevents overpronation.',
        imageUrl: 'https://images.unsplash.com/photo-1469395446868-fb6a048d5ca3'
      }
    ],
    pros: [
      'Exceptional arch support',
      'Breathable mesh upper',
      'Durable construction',
      'Wide toe box'
    ],
    cons: [
      'Premium price point',
      'Break-in period required',
      'Limited color options'
    ],
    videoId: 'dQw4w9WgXcQ'
  };

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ImageGallery images={product.images} />
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{product.brand}</p>
              <p className="text-3xl font-bold text-primary mb-6">{product.price}</p>
              <p className="text-gray-700 mb-8">{product.longDescription}</p>
              
              <button className="w-full bg-[#f3a736] text-white py-3 rounded-lg font-semibold hover:bg-[#f3a736]/90 transition-colors">
                Buy on Amazon
              </button>
            </motion.div>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-12">Key Features</h2>
          <Features features={product.features} />
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-12">Pros & Cons</h2>
          <ProsAndCons pros={product.pros} cons={product.cons} />
        </section>

        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-12">Video Review</h2>
          <VideoReview videoId={product.videoId} />
        </section>
      </div>
    </div>
  );
}
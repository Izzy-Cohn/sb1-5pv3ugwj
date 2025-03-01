import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageGallery } from '../components/ProductProfile/ImageGallery';
import { Features } from '../components/ProductProfile/Features';
import { ProsAndCons } from '../components/ProductProfile/ProsAndCons';
import { VideoReview } from '../components/ProductProfile/VideoReview';
import { Shield, Layers, Footprints } from 'lucide-react';

export function ProductPage() {
  useParams();
  
  const product = {
    id: 'powerstep-pulse-maxx',
    name: 'PowerStep Pulse Maxx Running Insoles',
    brand: 'PowerStep',
    description: 'Overpronation Corrective Orthotic Inserts for Running Shoes',
    longDescription: `The PowerStep Pulse Maxx Running Insoles represent the latest in orthotic technology, 
    specifically designed for runners who need maximum support and stability. These insoles feature a unique 
    combination of firm but flexible support shell, dual-layer cushioning, and a deep heel cradle for enhanced 
    stability. The angled exterior heel platform helps control excess motion while running, making them perfect 
    for overpronation and various foot conditions. The insoles are topped with an antimicrobial fabric that 
    helps reduce heat and friction while maintaining a fresh environment for your feet.`,
    price: '$47.95',
    images: [
      'https://m.media-amazon.com/images/I/81qfPtgpVYL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Ry9MtQIBL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81H4DjkegrL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81vNBVW1SDL._AC_SL1500_.jpg'
    ],
    features: [
      {
        title: 'Maximum Support Shell',
        description: 'Medical-grade foot support with firm but flexible shell for motion control and stability.',
        icon: Shield
      },
      {
        title: 'Dual-Layer Cushioning',
        description: 'VCT® Variable Cushioning Technology combines targeted and controlled cushioning for superior comfort.',
        icon: Layers
      },
      {
        title: 'Deep Heel Cradle',
        description: 'Enhanced stability and support with angled exterior heel platform for motion control.',
        icon: Footprints
      }
    ],
    pros: [
      'Maximum arch support and stability',
      'Excellent motion control for overpronation',
      'Antimicrobial top fabric',
      'Deep heel cradle for enhanced stability',
      'Dual-layer cushioning system',
      'Can be trimmed to fit',
      'Made in the USA'
    ],
    cons: [
      'May feel firm initially and require break-in period',
      'Might be too rigid for neutral runners',
      'Higher price point compared to basic insoles',
      'May not fit all shoe types'
    ],
    videoId: 'dQw4w9WgXcQ' // Placeholder - would need actual product video ID
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
              
              <a 
                href="https://amzn.to/4jUFzBO" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full bg-[#f3a736] text-white py-3 rounded-lg font-semibold hover:bg-[#f3a736]/90 transition-colors">
                  Buy on Amazon
                </button>
              </a>
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
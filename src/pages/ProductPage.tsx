import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageGallery } from '../components/ProductProfile/ImageGallery';
import { Features } from '../components/ProductProfile/Features';
import { ProsAndCons } from '../components/ProductProfile/ProsAndCons';
import { VideoReview } from '../components/ProductProfile/VideoReview';
import { Shield, Layers, Footprints } from 'lucide-react';
import { productCategoriesData } from '../components/Recommendations/RecommendationsList/recommendationsData';
import { useState, useEffect } from 'react';

interface ProductDetail {
  id: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  price: string;
  images: string[];
  features: {
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
  pros: string[];
  cons: string[];
  videoId: string;
  amazonUrl?: string;
}

// This would eventually be moved to a database or API
const productDetails: Record<string, ProductDetail> = {
  'powerstep-pulse-maxx-running-insoles': {
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
    videoId: 'dQw4w9WgXcQ', // Placeholder
    amazonUrl: 'https://www.amazon.com/dp/B09K4N4CWD?social_share=cm_sw_r_cso_em_apin_dp_79ZQZZ7BZYKZ5B43HFAM&starsLeft=1&th=1&linkCode=sl1&tag=newsonshoes-20&linkId=c8f5f8897bcba893e65d843f7b32b08e&language=en_US&ref_=as_li_ss_tl'
  }
};

export function ProductPage() {
  const { category, slug, productId } = useParams();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [basicProductInfo, setBasicProductInfo] = useState<any>(null);

  useEffect(() => {
    // First check if we have detailed product info
    if (productId && productDetails[productId]) {
      setProduct(productDetails[productId]);
      return;
    }

    // If not, try to find basic product info from the data structure
    if (category && slug && productId) {
      const categoryData = productCategoriesData[category];
      if (categoryData && categoryData.recommendations[slug]) {
        const items = categoryData.recommendations[slug].items;
        const formattedProductId = productId.replace(/-/g, ' ');
        
        // Find the product with a case-insensitive match on the name
        const foundProduct = items.find(item => 
          item.name.toLowerCase() === formattedProductId
        );
        
        if (foundProduct) {
          setBasicProductInfo(foundProduct);
        }
      }
    }
  }, [category, slug, productId]);

  // Use the data from productDetails if available, otherwise fallback to basic info
  const displayProduct = product || (basicProductInfo ? {
    id: productId,
    name: basicProductInfo.name,
    brand: basicProductInfo.brand,
    description: basicProductInfo.description,
    longDescription: basicProductInfo.description,
    price: basicProductInfo.price,
    images: [basicProductInfo.imageUrl],
    features: [],
    pros: [],
    cons: [],
    videoId: '',
    amazonUrl: basicProductInfo.amazonUrl
  } : null);

  if (!displayProduct) {
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
          <ImageGallery images={displayProduct.images} />
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl font-bold mb-2">{displayProduct.name}</h1>
              <p className="text-xl text-gray-600 mb-4">{displayProduct.brand}</p>
              <p className="text-3xl font-bold text-primary mb-6">{displayProduct.price}</p>
              <p className="text-gray-700 mb-8">{displayProduct.longDescription}</p>
              
              {displayProduct.amazonUrl ? (
                <a 
                  href={displayProduct.amazonUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button className="w-full bg-[#f3a736] text-white py-3 rounded-lg font-semibold hover:bg-[#f3a736]/90 transition-colors">
                    Buy on Amazon
                  </button>
                </a>
              ) : null}
            </motion.div>
          </div>
        </div>

        {displayProduct.features && displayProduct.features.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-12">Key Features</h2>
            <Features features={displayProduct.features} />
          </section>
        )}

        {displayProduct.pros && displayProduct.pros.length > 0 && displayProduct.cons && displayProduct.cons.length > 0 && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-12">Pros & Cons</h2>
            <ProsAndCons pros={displayProduct.pros} cons={displayProduct.cons} />
          </section>
        )}

        {displayProduct.videoId && (
          <section className="mt-24">
            <h2 className="text-3xl font-bold mb-12">Video Review</h2>
            <VideoReview videoId={displayProduct.videoId} />
          </section>
        )}
      </div>
    </div>
  );
}
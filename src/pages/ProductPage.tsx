import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ImageGallery } from '../components/ProductProfile/ImageGallery';
import { Features } from '../components/ProductProfile/Features';
import { ProsAndCons } from '../components/ProductProfile/ProsAndCons';
import { VideoReview } from '../components/ProductProfile/VideoReview';
import { Shield, Layers, Footprints } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface ProductDetail {
  id: number;
  name: string;
  brand: string;
  description: string;
  long_description: string | null;
  image_url: string;
  price: string | number;
  amazon_url: string | null;
  features: {
    title: string;
    description: string;
    icon: string;
  }[] | null;
  pros: string[] | null;
  cons: string[] | null;
  video_id: string | null;
}

// Map icon names to components
const iconMap: Record<string, React.ElementType> = {
  Shield,
  Layers,
  Footprints
};

export function ProductPage() {
  const { category, slug, productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<ProductDetail | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        if (!category || !slug || !productId) {
          throw new Error('Missing parameters');
        }
        
        // First get the product category ID
        const { data: productCategoryData, error: productCategoryError } = await supabase
          .from('product_categories')
          .select('id')
          .eq('slug', category)
          .single();
          
        if (productCategoryError) {
          throw new Error(`Error fetching product category: ${productCategoryError.message}`);
        }
        
        // Then get the recommendation category ID
        const { data: recommendationCategoryData, error: recommendationCategoryError } = await supabase
          .from('recommendation_categories')
          .select('id')
          .eq('product_category_id', productCategoryData.id)
          .eq('slug', slug)
          .single();
          
        if (recommendationCategoryError) {
          throw new Error(`Error fetching recommendation category: ${recommendationCategoryError.message}`);
        }
        
        // Convert productId (slug) into a searchable format
        const formattedProductName = productId.replace(/-/g, ' ');
        
        // Get the product by recommendation category and either exact slug match or name search
        const { data: productResults, error: productSearchError } = await supabase
          .from('products')
          .select('*')
          .eq('recommendation_category_id', recommendationCategoryData.id)
          .or(`slug.eq.${productId},name.ilike.%${formattedProductName}%`);
          
        if (productSearchError) {
          throw new Error(`Error searching for product: ${productSearchError.message}`);
        }
        
        if (!productResults || productResults.length === 0) {
          throw new Error(`Product "${productId}" not found`);
        }
        
        // If we have multiple results, try to find the best match
        // or just use the first one if we can't determine
        let productData;
        if (productResults.length > 1) {
          // First try to find an exact slug match
          const exactSlugMatch = productResults.find(p => p.slug === productId);
          if (exactSlugMatch) {
            productData = exactSlugMatch;
          } else {
            // Otherwise, use the first result
            productData = productResults[0];
            console.warn(`Multiple products found for "${productId}", using first match: "${productData.name}"`);
          }
        } else {
          productData = productResults[0];
        }
        
        // Ensure feature icons are properly formatted as strings
        if (productData.features) {
          productData.features = productData.features.map(feature => ({
            ...feature,
            icon: typeof feature.icon === 'string' ? feature.icon : 'star' // Ensure icon is a string
          }));
        }
        
        setProduct(productData);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [category, slug, productId]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">
          {error || 'Product not found'}
        </div>
      </div>
    );
  }

  // Prepare the display data
  const displayProduct = {
    name: product.name,
    brand: product.brand,
    description: product.description,
    longDescription: product.long_description || product.description,
    price: typeof product.price === 'number' ? `$${product.price}` : product.price,
    images: [product.image_url], // In the future, we can support multiple images
    features: product.features?.map(feature => ({
      title: feature.title,
      description: feature.description,
      icon: feature.icon // Keep as string for the Features component
    })) || [],
    pros: product.pros || [],
    cons: product.cons || [],
    videoId: product.video_id || '',
    amazonUrl: product.amazon_url
  };

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
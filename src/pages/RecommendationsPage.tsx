import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RecommendationItem } from '../components/Recommendations/RecommendationsList/RecommendationItem';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';

interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  image_url: string;
  price: string | number;
  amazon_url?: string;
  slug: string;
}

interface RecommendationCategory {
  id: number;
  slug: string;
  title: string;
  products: Product[];
}

export function RecommendationsPage() {
  const { category, slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recommendationData, setRecommendationData] = useState<RecommendationCategory | null>(null);
  
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        if (!category || !slug) {
          throw new Error('Missing category or slug parameters');
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
        
        if (!productCategoryData) {
          throw new Error(`Product category "${category}" not found`);
        }
        
        // Then get the recommendation category
        const { data: recommendationCategoryData, error: recommendationCategoryError } = await supabase
          .from('recommendation_categories')
          .select('id, slug, title')
          .eq('product_category_id', productCategoryData.id)
          .eq('slug', slug)
          .single();
          
        if (recommendationCategoryError) {
          throw new Error(`Error fetching recommendation category: ${recommendationCategoryError.message}`);
        }
        
        if (!recommendationCategoryData) {
          throw new Error(`Recommendation category "${slug}" not found`);
        }
        
        // Finally get the products for this recommendation category
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('id, name, brand, description, image_url, price, amazon_url, slug')
          .eq('recommendation_category_id', recommendationCategoryData.id)
          .order('created_at', { ascending: false });
          
        if (productsError) {
          throw new Error(`Error fetching products: ${productsError.message}`);
        }
        
        // Combine the data
        setRecommendationData({
          ...recommendationCategoryData,
          products: productsData || []
        });
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [category, slug]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !recommendationData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">
          {error || 'Recommendation not found'}
        </div>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]">
            {recommendationData.title}
          </h1>
          <p className="text-xl text-gray-900 font-medium drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]">
            Expert-Tested Picks
          </p>
        </motion.div>
      </div>

      <section className="max-w-5xl mx-auto px-4 py-16">
        {recommendationData.products.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="text-xl">No products found in this category yet.</p>
            <p className="mt-2">Check back soon for our expert recommendations!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {recommendationData.products.map((product, index) => (
              <RecommendationItem
                key={product.id}
                name={product.name}
                brand={product.brand}
                description={product.description}
                imageUrl={product.image_url}
                price={typeof product.price === 'number' ? `$${product.price}` : product.price}
                amazonUrl={product.amazon_url}
                slug={product.slug}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
} 
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';

interface ProductCategory {
  id: number;
  slug: string;
  title: string;
}

interface RecommendationCategory {
  id: number;
  product_category_id: number;
  slug: string;
  title: string;
}

export function AdminPage() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [recommendationCategoryId, setRecommendationCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [amazonUrl, setAmazonUrl] = useState('');
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  
  // States for the dropdown data
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [recommendationCategories, setRecommendationCategories] = useState<RecommendationCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Fetch product categories on component mount
  useEffect(() => {
    async function fetchProductCategories() {
      try {
        const { data, error } = await supabase
          .from('product_categories')
          .select('*')
          .order('title');
          
        if (error) throw error;
        setProductCategories(data || []);
      } catch (err) {
        console.error('Error fetching product categories:', err);
        setStatus({
          message: 'Failed to load product categories',
          type: 'error'
        });
      } finally {
        setLoadingCategories(false);
      }
    }
    
    fetchProductCategories();
  }, []);

  // Fetch recommendation categories when a product category is selected
  useEffect(() => {
    if (!productCategoryId) {
      setRecommendationCategories([]);
      return;
    }
    
    async function fetchRecommendationCategories() {
      setLoadingCategories(true);
      try {
        const { data, error } = await supabase
          .from('recommendation_categories')
          .select('*')
          .eq('product_category_id', productCategoryId)
          .order('title');
          
        if (error) throw error;
        setRecommendationCategories(data || []);
      } catch (err) {
        console.error('Error fetching recommendation categories:', err);
        setStatus({
          message: 'Failed to load recommendation categories',
          type: 'error'
        });
      } finally {
        setLoadingCategories(false);
      }
    }
    
    fetchRecommendationCategories();
  }, [productCategoryId]);

  // Extract brand from name if brand is empty
  useEffect(() => {
    if (!brand && name) {
      const possibleBrands = [
        'PowerStep', 'Nike', 'Adidas', 'Brooks', 'New Balance', 'ASICS', 
        'StepWell', 'ActiveLife', 'PodiatricPlus', 'FootCare', 'StrideTech', 'AeroFlex'
      ];
      
      for (const possibleBrand of possibleBrands) {
        if (name.includes(possibleBrand)) {
          setBrand(possibleBrand);
          break;
        }
      }
    }
  }, [name, brand]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (loading) return;
    
    setLoading(true);
    setStatus(null);
    
    try {
      // Validate inputs
      if (!name || !imageUrl || !productCategoryId || !recommendationCategoryId || !amazonUrl || !description || !price || !brand) {
        setStatus({
          message: 'Please fill in all required fields',
          type: 'error'
        });
        return;
      }

      // Create numeric price
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      
      if (isNaN(numericPrice)) {
        setStatus({
          message: 'Please enter a valid price',
          type: 'error'
        });
        return;
      }
      
      // Add the product to the database
      const { data, error } = await supabase
        .from('products')
        .insert({
          recommendation_category_id: parseInt(recommendationCategoryId),
          name,
          brand,
          description,
          image_url: imageUrl,
          price: numericPrice,
          amazon_url: amazonUrl
        })
        .select()
        .single();
        
      if (error) throw error;
      
      // Success! Clear the form
      setName('');
      setImageUrl('');
      setDescription('');
      setBrand('');
      setPrice('');
      setAmazonUrl('');
      
      setStatus({
        message: `Successfully added "${name}" to the database!`,
        type: 'success'
      });
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
      
    } catch (err) {
      console.error('Error adding product:', err);
      setStatus({
        message: err instanceof Error ? err.message : 'An unknown error occurred',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24">
      <div className="max-w-3xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Add New Product</h1>
          
          {status && (
            <div className={`p-4 mb-6 rounded-lg ${
              status.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {status.message}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="PowerStep Pulse Maxx Running Insoles"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">
                Brand <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="PowerStep"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="High-quality product with excellent features and benefits."
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="49.99"
              />
              <p className="text-xs text-gray-500 mt-1">Enter price without currency symbol (e.g., 49.99)</p>
            </div>
            
            <div className="mb-6">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Product Image URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://m.media-amazon.com/images/I/..."
              />
              {imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img 
                    src={imageUrl} 
                    alt="Product preview" 
                    className="w-32 h-32 object-cover border border-gray-300 rounded-md"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Invalid+Image';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="mb-6">
              <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Product Category <span className="text-red-500">*</span>
              </label>
              <select
                id="productCategory"
                value={productCategoryId}
                onChange={(e) => setProductCategoryId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loadingCategories}
              >
                <option value="">
                  {loadingCategories ? 'Loading categories...' : 'Select a product category'}
                </option>
                {productCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="recommendationCategory" className="block text-sm font-medium text-gray-700 mb-1">
                Recommendation Category <span className="text-red-500">*</span>
              </label>
              <select
                id="recommendationCategory"
                value={recommendationCategoryId}
                onChange={(e) => setRecommendationCategoryId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={!productCategoryId || loadingCategories}
              >
                <option value="">
                  {!productCategoryId
                    ? 'Please select a product category first'
                    : loadingCategories
                    ? 'Loading categories...'
                    : 'Select a recommendation category'}
                </option>
                {recommendationCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="amazonUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Amazon.com Product URL <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                id="amazonUrl"
                value={amazonUrl}
                onChange={(e) => setAmazonUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.amazon.com/dp/..."
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                loading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-opacity-90'
              }`}
            >
              {loading ? 'Adding Product...' : 'Add Product'}
            </button>
          </form>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">How to Use</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter the complete product name</li>
              <li>Enter or confirm the brand name</li>
              <li>Enter a concise product description</li>
              <li>Enter the price (numbers only)</li>
              <li>Paste a direct link to a high-quality product image</li>
              <li>Select the main product category (e.g., "Shoes", "Not Just Shoes")</li>
              <li>Select the specific recommendation category (e.g., "Best Inserts and Pads of 2025")</li>
              <li>Paste the Amazon affiliate link for the product</li>
              <li>Click "Add Product" to add it to the database</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              Note: Fields marked with * are required.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
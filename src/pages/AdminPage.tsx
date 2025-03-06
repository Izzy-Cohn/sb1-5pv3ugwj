import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../utils/supabase';
import { PlusCircle, X, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { iconMap } from '../utils/icons';
import IconPicker from '../components/IconPicker';

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

interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export function AdminPage() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [recommendationCategoryId, setRecommendationCategoryId] = useState('');
  const [description, setDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [amazonUrl, setAmazonUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [pros, setPros] = useState<string[]>([]);
  const [cons, setCons] = useState<string[]>([]);
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [advancedMode, setAdvancedMode] = useState(false);
  
  // States for the dropdown data
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [recommendationCategories, setRecommendationCategories] = useState<RecommendationCategory[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Feature form state
  const [newFeatureTitle, setNewFeatureTitle] = useState('');
  const [newFeatureDescription, setNewFeatureDescription] = useState('');
  
  // Pro/Con form state
  const [newPro, setNewPro] = useState('');
  const [newCon, setNewCon] = useState('');

  // Add new state for JSON upload
  const [jsonData, setJsonData] = useState<any>(null);
  const [jsonFileName, setJsonFileName] = useState<string>('');
  const [directUpload, setDirectUpload] = useState<boolean>(false);

  // Add new state for product deletion
  const [searchProductName, setSearchProductName] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

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

  const handleAddFeature = () => {
    if (!newFeatureTitle || !newFeatureDescription) return;
    
    setFeatures([...features, {
      title: newFeatureTitle,
      description: newFeatureDescription,
      icon: "star"
    }]);
    
    setNewFeatureTitle('');
    setNewFeatureDescription('');
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleAddPro = () => {
    if (!newPro) return;
    setPros([...pros, newPro]);
    setNewPro('');
  };

  const handleRemovePro = (index: number) => {
    setPros(pros.filter((_, i) => i !== index));
  };

  const handleAddCon = () => {
    if (!newCon) return;
    setCons([...cons, newCon]);
    setNewCon('');
  };

  const handleRemoveCon = (index: number) => {
    setCons(cons.filter((_, i) => i !== index));
  };

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
        setLoading(false);
        return;
      }

      // Create numeric price
      const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
      
      if (isNaN(numericPrice)) {
        setStatus({
          message: 'Please enter a valid price',
          type: 'error'
        });
        setLoading(false);
        return;
      }
      
      // Prepare the product data
      const productData: any = {
        recommendation_category_id: parseInt(recommendationCategoryId),
        name,
        brand,
        description,
        image_url: imageUrl,
        price: numericPrice,
        amazon_url: amazonUrl
      };
      
      // Add advanced fields if they exist
      if (advancedMode) {
        if (longDescription) productData.long_description = longDescription;
        if (videoId) productData.video_id = videoId;
        
        // Standardize features to use star icon
        if (features.length > 0) {
          productData.features = features.map(feature => ({
            title: feature.title,
            description: feature.description,
            icon: "star" // Force all features to use star icon
          }));
        }
        
        if (pros.length > 0) productData.pros = pros;
        if (cons.length > 0) productData.cons = cons;
      }
      
      // Add the product to the database
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();
        
      if (error) throw error;
      
      // Success! Clear the form
      setName('');
      setImageUrl('');
      setDescription('');
      setLongDescription('');
      setBrand('');
      setPrice('');
      setAmazonUrl('');
      setVideoId('');
      setFeatures([]);
      setPros([]);
      setCons([]);
      
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

  // Handle JSON file upload
  const handleJSONUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setJsonFileName(file.name);
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        setJsonData(parsedData);
        
        // Populate form fields with the JSON data
        if (parsedData.name) setName(parsedData.name);
        if (parsedData.brand) setBrand(parsedData.brand);
        if (parsedData.description) setDescription(parsedData.description);
        if (parsedData.longDescription) setLongDescription(parsedData.longDescription);
        
        // Don't set the price from JSON as it will be manually entered
        // if (parsedData.price) setPrice(parsedData.price.toString());
        
        // Keep imageUrl from manually entered value instead of the JSON
        // if (parsedData.imageUrl) setImageUrl(parsedData.imageUrl);
        
        if (parsedData.amazonUrl) setAmazonUrl(parsedData.amazonUrl);
        if (parsedData.videoId) setVideoId(parsedData.videoId);
        
        // Handle arrays - UPDATE FEATURES TO ALWAYS USE "star" ICON
        if (parsedData.features && Array.isArray(parsedData.features)) {
          // Ensure all features use the "star" icon
          const standardizedFeatures = parsedData.features.map(feature => ({
            title: feature.title,
            description: feature.description,
            icon: "star" // Force all features to use star icon
          }));
          setFeatures(standardizedFeatures);
        }
        
        if (parsedData.pros && Array.isArray(parsedData.pros)) {
          setPros(parsedData.pros);
        }
        if (parsedData.cons && Array.isArray(parsedData.cons)) {
          setCons(parsedData.cons);
        }
        
        // Show advanced options if advanced fields exist
        if (parsedData.longDescription || 
            parsedData.videoId || 
            (parsedData.features && parsedData.features.length > 0) ||
            (parsedData.pros && parsedData.pros.length > 0) ||
            (parsedData.cons && parsedData.cons.length > 0)) {
          setAdvancedMode(true);
        }
        
        setStatus({
          message: 'JSON data loaded successfully! Please set image URL, price, and categories before submitting.',
          type: 'success'
        });
        
      } catch (error) {
        console.error('Error parsing JSON:', error);
        setStatus({
          message: 'Error parsing JSON file. Please check the format.',
          type: 'error'
        });
      }
    };
    
    reader.readAsText(file);
  };
  
  // Handle direct JSON submission to database
  const handleDirectJSONSubmit = async (data: any) => {
    setLoading(true);
    setStatus(null);
    
    try {
      // Basic validation
      if (!data.name || !imageUrl || !price || !productCategoryId || !recommendationCategoryId) {
        throw new Error('Missing required fields: product name, image URL, price, or categories');
      }
      
      // Format data for database
      const productData: any = {
        recommendation_category_id: parseInt(recommendationCategoryId),
        name: data.name,
        brand: data.brand || '',
        description: data.description || '',
        image_url: imageUrl, // Use manually provided image URL
        price: parseFloat(price.replace(/[^0-9.]/g, '')), // Use manually entered price
        amazon_url: data.amazonUrl || ''
      };
      
      // Add optional fields
      if (data.longDescription) productData.long_description = data.longDescription;
      if (data.videoId) productData.video_id = data.videoId;
      
      // Standardize features to use star icon
      if (data.features && Array.isArray(data.features)) {
        productData.features = data.features.map((feature: any) => ({
          title: feature.title,
          description: feature.description,
          icon: "star" // Force all features to use star icon
        }));
      }
      
      if (data.pros && Array.isArray(data.pros)) productData.pros = data.pros;
      if (data.cons && Array.isArray(data.cons)) productData.cons = data.cons;
      
      // Insert into database
      const { error } = await supabase
        .from('products')
        .insert(productData);
        
      if (error) throw error;
      
      setStatus({
        message: `Successfully added "${data.name}" to the database!`,
        type: 'success'
      });
      
      // Reset form
      setName('');
      setImageUrl('');
      setDescription('');
      setLongDescription('');
      setBrand('');
      setPrice('');
      setAmazonUrl('');
      setVideoId('');
      setFeatures([]);
      setPros([]);
      setCons([]);
      setJsonData(null);
      setJsonFileName('');
      
    } catch (err) {
      console.error('Error with direct JSON upload:', err);
      setStatus({
        message: err instanceof Error ? err.message : 'An unknown error occurred',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Add new function to handle product deletion
  const handleDeleteProduct = async (productId: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId);
      
      if (error) throw error;
      
      // Remove from results
      setSearchResults(searchResults.filter(p => p.id !== productId));
      
      setStatus({
        message: 'Product deleted successfully',
        type: 'success'
      });
    } catch (err) {
      console.error('Error deleting product:', err);
      setStatus({
        message: err instanceof Error ? err.message : 'An error occurred while deleting',
        type: 'error'
      });
    }
  };

  // Add new function to handle product search
  const handleSearchProducts = async () => {
    if (!searchProductName.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, brand')
        .ilike('name', `%${searchProductName}%`)
        .or(`brand.ilike.%${searchProductName}%`);
      
      if (error) throw error;
      
      setSearchResults(data || []);
    } catch (err) {
      console.error('Error searching products:', err);
      setStatus({
        message: err instanceof Error ? err.message : 'An error occurred during search',
        type: 'error'
      });
    }
  };

  return (
    <div className="pt-24 pb-24">
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
          
          {/* Enhanced JSON Upload Section */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Upload Product Data</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                JSON File Upload
              </label>
              <div className="flex items-center">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleJSONUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
              {jsonFileName && (
                <p className="mt-2 text-sm text-green-600">
                  Loaded: {jsonFileName}
                </p>
              )}
            </div>
            
            {/* Manual override fields */}
            <div className="border-t border-gray-200 pt-4 mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Manual Overrides</h3>
              
              <div className="mb-4">
                <label htmlFor="jsonImageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="url"
                  id="jsonImageUrl"
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
              
              {/* Added Price Manual Override */}
              <div className="mb-4">
                <label htmlFor="jsonPrice" className="block text-sm font-medium text-gray-700 mb-1">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="jsonPrice"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-7 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="jsonProductCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Product Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="jsonProductCategory"
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

              <div className="mb-4">
                <label htmlFor="jsonRecommendationCategory" className="block text-sm font-medium text-gray-700 mb-1">
                  Recommendation Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="jsonRecommendationCategory"
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
            </div>
            
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="directUpload"
                checked={directUpload}
                onChange={(e) => setDirectUpload(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="directUpload" className="ml-2 block text-sm text-gray-700">
                Direct upload (skip form review)
              </label>
            </div>
            
            <p className="text-xs text-gray-500">
              Upload a JSON file to automatically populate most fields. You must manually select the image URL,
              price, product category, and recommendation category before submission. If direct upload is enabled, 
              data will be submitted to the database immediately.
            </p>
            
            {/* Add button to submit JSON with overrides directly */}
            {jsonData && (
              <button
                type="button"
                onClick={() => handleDirectJSONSubmit(jsonData)}
                disabled={!imageUrl || !price || !productCategoryId || !recommendationCategoryId || loading}
                className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors ${
                  !imageUrl || !price || !productCategoryId || !recommendationCategoryId || loading
                    ? 'bg-gray-400 text-white cursor-not-allowed' 
                    : 'bg-primary text-white hover:bg-opacity-90'
                }`}
              >
                {loading ? 'Processing...' : 'Submit with Manual Overrides'}
              </button>
            )}
          </div>
          
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

            <div className="mt-8 mb-6">
              <button
                type="button"
                onClick={() => setAdvancedMode(!advancedMode)}
                className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
              >
                {advancedMode ? (
                  <>
                    <ChevronUp className="w-4 h-4 mr-1" />
                    Hide Advanced Options
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 mr-1" />
                    Show Advanced Options
                  </>
                )}
              </button>
            </div>

            {advancedMode && (
              <div className="border-t border-gray-200 pt-6 mb-6 space-y-6">
                <div>
                  <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Long Description
                  </label>
                  <textarea
                    id="longDescription"
                    value={longDescription}
                    onChange={(e) => setLongDescription(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Detailed product description that will be displayed on the product page..."
                  />
                </div>

                <div>
                  <label htmlFor="videoId" className="block text-sm font-medium text-gray-700 mb-1">
                    YouTube Video ID
                  </label>
                  <input
                    type="text"
                    id="videoId"
                    value={videoId}
                    onChange={(e) => setVideoId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="dQw4w9WgXcQ"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the YouTube video ID (e.g., for https://youtube.com/watch?v=dQw4w9WgXcQ, enter "dQw4w9WgXcQ")
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Key Features
                    </label>
                    <span className="text-xs text-gray-500">
                      {features.length} feature{features.length !== 1 ? 's' : ''} added
                    </span>
                  </div>
                  
                  <div className="mb-4 space-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-start bg-gray-50 p-3 rounded-md">
                        <div className="flex-1">
                          <div className="font-medium">{feature.title}</div>
                          <div className="text-sm text-gray-600">{feature.description}</div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <Star className="w-4 h-4 mr-1 text-gray-600" />
                            <span>Star</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFeature(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border border-gray-200 rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">Add New Feature</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <input
                        type="text"
                        value={newFeatureTitle}
                        onChange={(e) => setNewFeatureTitle(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Feature Title"
                      />
                      <textarea
                        value={newFeatureDescription}
                        onChange={(e) => setNewFeatureDescription(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Feature Description"
                        rows={2}
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="flex justify-center items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100"
                      >
                        <PlusCircle className="w-4 h-4 mr-1" /> Add Feature
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Pros
                      </label>
                      <span className="text-xs text-gray-500">
                        {pros.length} item{pros.length !== 1 ? 's' : ''} added
                      </span>
                    </div>
                    
                    <div className="mb-3 space-y-2">
                      {pros.map((pro, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                          <div className="flex-1 text-sm">{pro}</div>
                          <button
                            type="button"
                            onClick={() => handleRemovePro(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex">
                      <input
                        type="text"
                        value={newPro}
                        onChange={(e) => setNewPro(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                        placeholder="Add a pro"
                      />
                      <button
                        type="button"
                        onClick={handleAddPro}
                        className="px-3 py-2 bg-blue-50 text-blue-600 rounded-r-md hover:bg-blue-100"
                      >
                        <PlusCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">
                        Cons
                      </label>
                      <span className="text-xs text-gray-500">
                        {cons.length} item{cons.length !== 1 ? 's' : ''} added
                      </span>
                    </div>
                    
                    <div className="mb-3 space-y-2">
                      {cons.map((con, index) => (
                        <div key={index} className="flex items-center bg-gray-50 p-2 rounded-md">
                          <div className="flex-1 text-sm">{con}</div>
                          <button
                            type="button"
                            onClick={() => handleRemoveCon(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex">
                      <input
                        type="text"
                        value={newCon}
                        onChange={(e) => setNewCon(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
                        placeholder="Add a con"
                      />
                      <button
                        type="button"
                        onClick={handleAddCon}
                        className="px-3 py-2 bg-blue-50 text-blue-600 rounded-r-md hover:bg-blue-100"
                      >
                        <PlusCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
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
              <li>For detailed product pages, click "Show Advanced Options" to add more content</li>
              <li>Click "Add Product" to add it to the database</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              Note: Fields marked with * are required.
            </p>
          </div>

          {/* Product Management Section */}
          <div className="bg-white p-8 rounded-lg shadow-sm mb-6">
            <h2 className="text-xl font-semibold mb-4">Product Management</h2>
            
            <div className="mb-4">
              <label htmlFor="deleteProductName" className="block text-sm font-medium text-gray-700 mb-1">
                Delete Products by Name
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  id="deleteProductName"
                  value={searchProductName}
                  onChange={(e) => setSearchProductName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter product name to search"
                />
                <button
                  type="button"
                  onClick={handleSearchProducts}
                  className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Search
                </button>
              </div>
            </div>
            
            {searchResults.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-medium mb-2">Search Results</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Brand
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {searchResults.map((product) => (
                        <tr key={product.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {product.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {product.brand}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Feature Preview */}
          {features.length > 0 && (
            <div className="mb-6 p-4 border border-gray-200 rounded-md">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Feature Preview</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Star className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">{feature.title || "Untitled Feature"}</h4>
                      <p className="text-xs text-gray-600 mt-1">{feature.description || "No description"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 
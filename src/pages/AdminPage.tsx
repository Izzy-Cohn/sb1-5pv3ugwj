import { useState } from 'react';
import { motion } from 'framer-motion';
import { productCategoriesData } from '../components/Recommendations/RecommendationsList/recommendationsData';
import { addNewProduct } from '../utils/productUtils';

export function AdminPage() {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
  const [amazonUrl, setAmazonUrl] = useState('');
  const [status, setStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Generate list of all available categories
  const categories = Object.entries(productCategoriesData).flatMap(([, categoryData]) => 
    Object.entries(categoryData.recommendations).map(([, recData]) => recData.title)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate inputs
      if (!name || !imageUrl || !category || !amazonUrl) {
        setStatus({
          message: 'Please fill in all fields',
          type: 'error'
        });
        return;
      }
      
      // Add the product
      addNewProduct({
        name,
        imageUrl,
        category,
        amazonUrl
      });
      
      // Clear form and show success message
      setName('');
      setImageUrl('');
      setCategory('');
      setAmazonUrl('');
      setStatus({
        message: `Successfully added "${name}" to ${category}`,
        type: 'success'
      });
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setStatus(null);
      }, 3000);
      
    } catch (error) {
      setStatus({
        message: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        type: 'error'
      });
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
                Product Name
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
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Product Image URL
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
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="amazonUrl" className="block text-sm font-medium text-gray-700 mb-1">
                Amazon.com Product URL
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
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Add Product
            </button>
          </form>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold mb-2">How to Use</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter the complete product name</li>
              <li>Paste a direct link to a high-quality product image</li>
              <li>Select the appropriate product category from the dropdown</li>
              <li>Paste the Amazon affiliate link for the product</li>
              <li>Click "Add Product" to add it to the website</li>
            </ol>
            <p className="mt-4 text-sm text-gray-600">
              Note: The product will be added to the top of the selected category list.
              For more detailed product information, contact the development team.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 
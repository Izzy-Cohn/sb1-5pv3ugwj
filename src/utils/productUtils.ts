import { productCategoriesData } from '../components/Recommendations/RecommendationsList/recommendationsData';

interface NewProductInfo {
  name: string;
  imageUrl: string;
  productCategory: string;
  recommendationCategory: string;
  amazonUrl: string;
}

/**
 * Formats a string into a URL-friendly slug
 */
export function formatToSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Extracts the price from an Amazon URL or sets a default
 */
export function extractPriceFromAmazon(url: string): string {
  // In a real implementation, you might use an Amazon API to fetch the price
  // For now, we'll return a default price
  return '$49.99';
}

/**
 * Extracts the brand from a product name or sets a default
 */
export function extractBrandFromName(name: string): string {
  // This is a simple implementation - in reality, you might have a more sophisticated approach
  const possibleBrands = [
    'PowerStep', 'Nike', 'Adidas', 'Brooks', 'New Balance', 'ASICS', 
    'StepWell', 'ActiveLife', 'PodiatricPlus', 'FootCare', 'StrideTech', 'AeroFlex'
  ];
  
  for (const brand of possibleBrands) {
    if (name.includes(brand)) {
      return brand;
    }
  }
  
  return 'Generic';
}

/**
 * Adds a new product to the data structure
 */
export function addNewProduct(productInfo: NewProductInfo): void {
  const { name, imageUrl, productCategory, recommendationCategory, amazonUrl } = productInfo;
  
  // Validate that the categories exist
  if (!productCategoriesData[productCategory]) {
    throw new Error(`Product category "${productCategory}" not found`);
  }
  
  if (!productCategoriesData[productCategory].recommendations[recommendationCategory]) {
    throw new Error(`Recommendation category "${recommendationCategory}" not found in ${productCategory}`);
  }
  
  // Create the new product object
  const newProduct = {
    name,
    brand: extractBrandFromName(name),
    description: `${name} - Click for more details and full description.`,
    imageUrl,
    price: extractPriceFromAmazon(amazonUrl),
    amazonUrl
  };
  
  // Add the product to the data structure
  productCategoriesData[productCategory].recommendations[recommendationCategory].items.unshift(newProduct);
  
  console.log(`Successfully added ${name} to ${productCategoriesData[productCategory].recommendations[recommendationCategory].title}`);
}

/**
 * Creates a detailed product page object for the product
 */
export function createDetailedProductData(productInfo: NewProductInfo): any {
  const { name, imageUrl, amazonUrl } = productInfo;
  const formattedName = formatToSlug(name);
  
  // Create a basic product detail object
  // In a real app, you might want to prompt for more details or use AI to generate them
  return {
    id: formattedName,
    name,
    brand: extractBrandFromName(name),
    description: `${name} - High-quality product for your needs.`,
    longDescription: `The ${name} is designed to provide comfort and support. This premium product offers excellent performance and durability. Made with high-quality materials, it ensures a comfortable experience while meeting your specific needs.`,
    price: extractPriceFromAmazon(amazonUrl),
    images: [imageUrl],
    features: [
      {
        title: 'Premium Quality',
        description: 'Made with high-quality materials for durability and comfort.',
        icon: 'Shield' // You would need to handle icon mapping in the ProductPage component
      },
      {
        title: 'Superior Design',
        description: 'Ergonomic design that provides optimal support and comfort.',
        icon: 'Layers'
      },
      {
        title: 'Perfect Fit',
        description: 'Designed to fit perfectly and provide maximum comfort.',
        icon: 'Footprints'
      }
    ],
    pros: [
      'High-quality materials',
      'Ergonomic design',
      'Comfortable fit',
      'Durable construction',
      'Easy to use'
    ],
    cons: [
      'May require a break-in period',
      'Premium price point',
      'May not fit all sizes or preferences'
    ],
    videoId: '', // Would need a real video ID
    amazonUrl
  };
} 
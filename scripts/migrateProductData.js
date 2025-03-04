// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are required. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
  process.exit(1);
}

console.log('Using Supabase URL:', supabaseUrl);
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Original product data with detailed content
const productDetails = {
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
    price: '47.95',
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
        icon: 'Shield'
      },
      {
        title: 'Dual-Layer Cushioning',
        description: 'VCT® Variable Cushioning Technology combines targeted and controlled cushioning for superior comfort.',
        icon: 'Layers'
      },
      {
        title: 'Deep Heel Cradle',
        description: 'Enhanced stability and support with angled exterior heel platform for motion control.',
        icon: 'Footprints'
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

async function migrateProductData() {
  console.log('Starting product data migration...');
  
  try {
    // First, list all product categories to diagnose
    const allCategoriesResult = await supabase
      .from('product_categories')
      .select('*');
      
    console.log('All product categories:', allCategoriesResult.data);
    
    // Find the "Not Just Shoes" category
    const categoryResult = await supabase
      .from('product_categories')
      .select('*')
      .eq('slug', 'not-just-shoes')
      .single();
      
    if (categoryResult.error) {
      console.error('Error finding "Not Just Shoes" category:', categoryResult.error);
      throw new Error(`Error finding 'Not Just Shoes' category: ${categoryResult.error.message}`);
    }
    
    console.log('Found "Not Just Shoes" category:', categoryResult.data);
    const notJustShoesCategory = categoryResult.data;
    
    // List all recommendation categories for debugging
    const allRecCategoriesResult = await supabase
      .from('recommendation_categories')
      .select('*');
      
    console.log('All recommendation categories:', allRecCategoriesResult.data);
    
    // Find the "Best Inserts" recommendation category
    const recCategoryResult = await supabase
      .from('recommendation_categories')
      .select('*')
      .eq('product_category_id', notJustShoesCategory.id)
      .eq('slug', 'best-inserts');
      
    if (recCategoryResult.error) {
      console.error('Error finding "Best Inserts" category:', recCategoryResult.error);
      throw new Error(`Error finding 'Best Inserts' category: ${recCategoryResult.error.message}`);
    }
    
    console.log('Matching recommendation categories:', recCategoryResult.data);
    
    if (!recCategoryResult.data || recCategoryResult.data.length === 0) {
      throw new Error('No "Best Inserts" category found for Not Just Shoes');
    }
    
    const insertsCategory = recCategoryResult.data[0];
    
    // List all products for debugging
    const allProductsResult = await supabase
      .from('products')
      .select('*');
      
    console.log('All products in database:', allProductsResult.data);
    
    // Find the existing PowerStep product in the database - be less specific in the query
    const productQueryResult = await supabase
      .from('products')
      .select('*')
      .eq('recommendation_category_id', insertsCategory.id);
      
    if (productQueryResult.error) {
      console.error('Error finding products:', productQueryResult.error);
      throw new Error(`Error finding PowerStep product: ${productQueryResult.error.message}`);
    }
    
    console.log('Products in this category:', productQueryResult.data);
    
    // Find products with PowerStep in the name
    const powerStepProducts = productQueryResult.data.filter(p => 
      p.name && p.name.toLowerCase().includes('powerstep'));
    
    console.log('PowerStep products found:', powerStepProducts);
    
    const existingProduct = powerStepProducts.length > 0 ? powerStepProducts[0] : null;
    
    const productData = productDetails['powerstep-pulse-maxx-running-insoles'];
    
    if (existingProduct) {
      console.log(`Updating existing PowerStep product (ID: ${existingProduct.id})...`);
      console.log('Current product data:', existingProduct);
      
      // Update the existing product with the rich data
      const updateResult = await supabase
        .from('products')
        .update({
          long_description: productData.longDescription,
          features: productData.features,
          pros: productData.pros,
          cons: productData.cons,
          video_id: productData.videoId
        })
        .eq('id', existingProduct.id)
        .select();
        
      if (updateResult.error) {
        console.error('Error updating product:', updateResult.error);
        throw new Error(`Error updating product: ${updateResult.error.message}`);
      }
      
      console.log('Update result:', updateResult);
      console.log('Product updated successfully!');
    } else {
      console.log('PowerStep product not found, creating new record...');
      
      // Insert new product with the rich data
      const insertResult = await supabase
        .from('products')
        .insert({
          recommendation_category_id: insertsCategory.id,
          name: productData.name,
          brand: productData.brand,
          description: productData.description,
          long_description: productData.longDescription,
          image_url: productData.images[0], // Primary image
          price: parseFloat(productData.price),
          amazon_url: productData.amazonUrl,
          features: productData.features,
          pros: productData.pros,
          cons: productData.cons,
          video_id: productData.videoId
        })
        .select();
        
      if (insertResult.error) {
        console.error('Error inserting product:', insertResult.error);
        throw new Error(`Error inserting product: ${insertResult.error.message}`);
      }
      
      console.log('Insert result:', insertResult);
      console.log('Product created successfully!');
    }
    
  } catch (err) {
    console.error('Migration failed:', err);
  }
}

// Execute the migration
migrateProductData(); 
import { supabase } from '../lib/supabase';
import type { Database } from '../types/database';

export const productService = {
  async getProductCategories() {
    const { data, error } = await supabase
      .from('product_categories')
      .select('*')
      .order('title');
    
    if (error) throw error;
    return data;
  },

  async getRecommendationCategories(productCategoryId: number) {
    const { data, error } = await supabase
      .from('recommendation_categories')
      .select('*')
      .eq('product_category_id', productCategoryId)
      .order('title');
    
    if (error) throw error;
    return data;
  },

  async addProduct(productData: Database['public']['Tables']['products']['Insert']) {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getProducts(recommendationCategoryId: number) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('recommendation_category_id', recommendationCategoryId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getProduct(productId: number) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();
    
    if (error) throw error;
    return data;
  }
}; 
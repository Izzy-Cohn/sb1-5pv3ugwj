export interface ProductCategory {
  id: number;
  slug: string;
  title: string;
  created_at: string;
}

export interface RecommendationCategory {
  id: number;
  product_category_id: number;
  slug: string;
  title: string;
  created_at: string;
}

export interface Product {
  id: number;
  recommendation_category_id: number;
  name: string;
  brand: string;
  description: string;
  long_description: string | null;
  image_url: string;
  price: number;
  amazon_url: string | null;
  features: {
    title: string;
    description: string;
    icon: string;
  }[] | null;
  pros: string[] | null;
  cons: string[] | null;
  video_id: string | null;
  created_at: string;
  updated_at: string;
}

export type Database = {
  public: {
    Tables: {
      product_categories: {
        Row: ProductCategory;
        Insert: Omit<ProductCategory, 'id' | 'created_at'>;
        Update: Partial<Omit<ProductCategory, 'id' | 'created_at'>>;
      };
      recommendation_categories: {
        Row: RecommendationCategory;
        Insert: Omit<RecommendationCategory, 'id' | 'created_at'>;
        Update: Partial<Omit<RecommendationCategory, 'id' | 'created_at'>>;
      };
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at' | 'updated_at'>>;
      };
    };
  };
}; 
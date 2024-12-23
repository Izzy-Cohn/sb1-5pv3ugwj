export interface ProductFeature {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProductDetails {
  id: string;
  name: string;
  brand: string;
  description: string;
  longDescription: string;
  price: string;
  images: string[];
  features: ProductFeature[];
  pros: string[];
  cons: string[];
  videoId: string;
  category: string;
  rank: number;
}
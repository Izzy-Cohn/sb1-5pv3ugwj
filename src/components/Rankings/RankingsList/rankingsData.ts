interface RankingItem {
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  price: string;
}

interface RankingsData {
  [key: string]: {
    title: string;
    items: RankingItem[];
  };
}

export const rankingsData: RankingsData = {
  'flat-feet': {
    title: 'Best Sneakers of 2025 for Flat Feet',
    items: [
      {
        name: 'UltraSupport X-1',
        brand: 'StrideTech',
        description: 'Revolutionary arch support system with adaptive cushioning perfect for flat feet. Features medical-grade orthotic inserts and stability control.',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        price: '$189.99'
      },
       {
        name: 'UltraSupport X-1',
        brand: 'StrideTech',
        description: 'Revolutionary arch support system with adaptive cushioning perfect for flat feet. Features medical-grade orthotic inserts and stability control.',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        price: '$189.99'
      },
       {
        name: 'UltraSupport X-1',
        brand: 'StrideTech',
        description: 'Revolutionary arch support system with adaptive cushioning perfect for flat feet. Features medical-grade orthotic inserts and stability control.',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        price: '$189.99'
      },
       {
        name: 'UltraSupport X-1',
        brand: 'StrideTech',
        description: 'Revolutionary arch support system with adaptive cushioning perfect for flat feet. Features medical-grade orthotic inserts and stability control.',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        price: '$189.99'
      },
       {
        name: 'UltraSupport X-1',
        brand: 'StrideTech',
        description: 'Revolutionary arch support system with adaptive cushioning perfect for flat feet. Features medical-grade orthotic inserts and stability control.',
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        price: '$189.99'
      }
    ]
  },
  'normal-high-arches': {
    title: 'Best Sneakers of 2025 for Normal to High Arches',
    items: [
      {
        name: 'CloudStep Elite',
        brand: 'AeroFlex',
        description: 'Engineered with advanced arch support and cushioning technology. Perfect for those with normal to high arches seeking premium comfort.',
        imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
        price: '$179.99'
      },
      {
        name: 'CloudStep Elite',
        brand: 'AeroFlex',
        description: 'Engineered with advanced arch support and cushioning technology. Perfect for those with normal to high arches seeking premium comfort.',
        imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
        price: '$179.99'
      },
      {
        name: 'CloudStep Elite',
        brand: 'AeroFlex',
        description: 'Engineered with advanced arch support and cushioning technology. Perfect for those with normal to high arches seeking premium comfort.',
        imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
        price: '$179.99'
      },
      {
        name: 'CloudStep Elite',
        brand: 'AeroFlex',
        description: 'Engineered with advanced arch support and cushioning technology. Perfect for those with normal to high arches seeking premium comfort.',
        imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
        price: '$179.99'
      },
      {
        name: 'CloudStep Elite',
        brand: 'AeroFlex',
        description: 'Engineered with advanced arch support and cushioning technology. Perfect for those with normal to high arches seeking premium comfort.',
        imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
        price: '$179.99'
      }
    ]
  },
  'knee-and-hip-pain': {
    title: 'Best Sneakers of 2025 for Knee & Hip Pain',
    items: [
      {
      name: 'UltraSupport X-1',
      brand: 'StrideTech',
      description: 'Revolutionary arch support system with adaptive cushioning perfect for flat feet. Features medical-grade orthotic inserts and stability control.',
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      price: '$189.99'
      }
    ]
  }
};
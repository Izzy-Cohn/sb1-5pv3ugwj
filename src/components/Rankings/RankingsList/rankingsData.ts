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
  'best-inserts': {
    title: 'Best Inserts and Pads of 2025',
    items: [
      {
        name: 'ComfortPro Elite',
        brand: 'OrthoTech',
        description: 'Premium orthotic inserts with advanced arch support and shock absorption. Perfect for all-day comfort and pain relief.',
        imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        price: '$49.99'
      },
      {
        name: 'ErgoFlex Plus',
        brand: 'StepWell',
        description: 'Customizable memory foam insoles that mold to your feet. Features moisture-wicking technology and pressure point relief.',
        imageUrl: 'https://images.unsplash.com/photo-1595341887985-cf2e6c8f81a8',
        price: '$39.99'
      },
      {
        name: 'SportFlex Pro',
        brand: 'ActiveLife',
        description: 'High-performance athletic inserts designed for impact absorption and stability. Ideal for sports and active lifestyles.',
        imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        price: '$44.99'
      },
      {
        name: 'HealWell Supreme',
        brand: 'PodiatricPlus',
        description: 'Therapeutic gel inserts with targeted heel cushioning. Perfect for those with plantar fasciitis or heel pain.',
        imageUrl: 'https://images.unsplash.com/photo-1595341887985-cf2e6c8f81a8',
        price: '$54.99'
      },
      {
        name: 'ArchSupport Ultra',
        brand: 'FootCare',
        description: 'Professional-grade arch support inserts with antimicrobial coating. Provides excellent stability and alignment.',
        imageUrl: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de',
        price: '$47.99'
      }
    ]
  },
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
interface RecommendationItem {
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  price: string;
}

interface RecommendationsData {
  [key: string]: {
    title: string;
    items: RecommendationItem[];
  };
}

export const recommendationsData: RecommendationsData = {
  'best-inserts': {
    title: 'Best Inserts and Pads of 2025',
    items: [
      {
        name: 'PowerStep Pulse Maxx Running Insoles',
        brand: 'PowerStep',
        description: 'Overpronation Corrective Orthotic Inserts for Running Shoes - Maximum Ankle, Foot Pain Relief & Arch Support Insoles (M 5-5.5, F 7-7.5).',
        imageUrl: 'https://m.media-amazon.com/images/I/81qfPtgpVYL._AC_SL1500_.jpg',
        price: '$47.95'
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
export interface RecommendationCategory {
  title: string;
  slug: string;
}

export interface ProductCategory {
  title: string;
  slug: string;
  recommendations: RecommendationCategory[];
}

export const productCategories: ProductCategory[] = [
  {
    title: 'Sneakers',
    slug: 'sneakers',
    recommendations: [
      {
        title: 'Best Sneakers of 2025 for Flat Feet',
        slug: 'flat-feet'
      },
      {
        title: 'Best Sneakers of 2025 for Normal to High Arches',
        slug: 'normal-high-arches'
      },
      {
        title: 'Best Sneakers of 2025 for Knee & Hip Pain',
        slug: 'knee-and-hip-pain'
      },
      {
        title: 'Best Sneakers of 2025 for Heel Pain',
        slug: 'heel-pain'
      },
      {
        title: 'Best Sneakers of 2025 for Ball-of-Foot Pain',
        slug: 'ball-of-foot-pain'
      }
    ]
  },
  {
    title: 'Sandals',
    slug: 'sandals',
    recommendations: [
      {
        title: 'Best Sandals of 2025 for Flat Feet',
        slug: 'flat-feet'
      },
      {
        title: 'Best Sandals of 2025 for Normal to High Arches',
        slug: 'normal-high-arches'
      },
      {
        title: 'Best Sandals of 2025 for Knee & Hip Pain',
        slug: 'knee-and-hip-pain'
      }
    ]
  },
  {
    title: 'Slippers',
    slug: 'slippers',
    recommendations: [
      {
        title: 'Best Slippers of 2025 for Flat Feet',
        slug: 'flat-feet'
      },
      {
        title: 'Best Slippers of 2025 for Normal to High Arches',
        slug: 'normal-high-arches'
      },
      {
        title: 'Best Slippers of 2025 for Knee & Hip Pain',
        slug: 'knee-and-hip-pain'
      }
    ]
  },
  {
    title: 'Shoes',
    slug: 'shoes',
    recommendations: [
      {
        title: 'Best "No Hands" Shoes of 2025',
        slug: 'no-hands'
      }
    ]
  },
  {
    title: 'Not Just Shoes',
    slug: 'not-just-shoes',
    recommendations: [
      {
        title: 'Best Inserts and Pads of 2025',
        slug: 'best-inserts'
      },
      {
        title: 'Best Lifestyle Accessories of 2025',
        slug: 'lifestyle-accessories'
      },
      {
        title: 'Top Athletic Wear Collections of 2025',
        slug: 'athletic-wear'
      },
      {
        title: 'Must-Have Fashion Essentials of 2025',
        slug: 'fashion-essentials'
      },
      {
        title: 'Best Sustainable Products of 2025',
        slug: 'sustainable-products'
      }
    ]
  }
];

// For backward compatibility
export const recommendations = productCategories.find(cat => cat.slug === 'sneakers')?.recommendations || [];
export const notJustShoesRecommendations = productCategories.find(cat => cat.slug === 'not-just-shoes')?.recommendations || []; 
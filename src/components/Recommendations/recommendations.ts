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
    title: 'Shoes',
    slug: 'shoes',
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
      },
      {
        title: 'Best "No Hands" Sneakers of 2025',
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

// For backward compatibility until codebase is fully updated
export const recommendations = productCategories.find(cat => cat.slug === 'shoes')?.recommendations || [];
export const notJustShoesRecommendations = productCategories.find(cat => cat.slug === 'not-just-shoes')?.recommendations || []; 
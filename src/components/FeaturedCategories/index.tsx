import { CategoryCard } from './CategoryCard';
import { categories } from './categories';
import { forwardRef } from 'react';

export const FeaturedCategories = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              {...category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
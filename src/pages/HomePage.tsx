import { useRef } from 'react';
import { Hero } from '../components/Hero';
import { FeaturedCategories } from '../components/FeaturedCategories';

export function HomePage() {
  const categoriesRef = useRef<HTMLElement>(null);

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Hero onExplore={scrollToCategories} />
      <FeaturedCategories ref={categoriesRef} />
    </>
  );
}
-- Create tables for our product hierarchy
CREATE TABLE product_categories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR NOT NULL UNIQUE,
  title VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE recommendation_categories (
  id SERIAL PRIMARY KEY,
  product_category_id INTEGER REFERENCES product_categories(id),
  slug VARCHAR NOT NULL,
  title VARCHAR NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(product_category_id, slug)
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  recommendation_category_id INTEGER REFERENCES recommendation_categories(id),
  name VARCHAR NOT NULL,
  brand VARCHAR NOT NULL,
  description TEXT,
  long_description TEXT,
  image_url VARCHAR NOT NULL,
  price DECIMAL(10,2),
  amazon_url VARCHAR,
  features JSONB,
  pros TEXT[],
  cons TEXT[],
  video_id VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Add indexes for better query performance
CREATE INDEX idx_products_recommendation_category ON products(recommendation_category_id);
CREATE INDEX idx_recommendation_categories_product_category ON recommendation_categories(product_category_id);

-- Insert initial product categories
INSERT INTO product_categories (slug, title) VALUES
  ('sneakers', 'Sneakers'),
  ('sandals', 'Sandals'),
  ('slippers', 'Slippers'),
  ('shoes', 'Shoes'),
  ('not-just-shoes', 'Not Just Shoes');

-- Insert recommendation categories for Sneakers
INSERT INTO recommendation_categories (product_category_id, slug, title)
SELECT 
  pc.id,
  slug,
  title
FROM (
  VALUES 
    ('flat-feet', 'Best Sneakers of 2025 for Flat Feet'),
    ('normal-high-arches', 'Best Sneakers of 2025 for Normal to High Arches'),
    ('knee-and-hip-pain', 'Best Sneakers of 2025 for Knee & Hip Pain'),
    ('heel-pain', 'Best Sneakers of 2025 for Heel Pain'),
    ('ball-of-foot-pain', 'Best Sneakers of 2025 for Ball-of-Foot Pain')
) AS data(slug, title)
CROSS JOIN product_categories pc
WHERE pc.slug = 'sneakers';

-- Insert recommendation categories for Sandals
INSERT INTO recommendation_categories (product_category_id, slug, title)
SELECT 
  pc.id,
  slug,
  title
FROM (
  VALUES 
    ('flat-feet', 'Best Sandals of 2025 for Flat Feet'),
    ('normal-high-arches', 'Best Sandals of 2025 for Normal to High Arches'),
    ('knee-and-hip-pain', 'Best Sandals of 2025 for Knee & Hip Pain')
) AS data(slug, title)
CROSS JOIN product_categories pc
WHERE pc.slug = 'sandals';

-- Insert recommendation categories for Slippers
INSERT INTO recommendation_categories (product_category_id, slug, title)
SELECT 
  pc.id,
  slug,
  title
FROM (
  VALUES 
    ('flat-feet', 'Best Slippers of 2025 for Flat Feet'),
    ('normal-high-arches', 'Best Slippers of 2025 for Normal to High Arches'),
    ('knee-and-hip-pain', 'Best Slippers of 2025 for Knee & Hip Pain')
) AS data(slug, title)
CROSS JOIN product_categories pc
WHERE pc.slug = 'slippers';

-- Insert recommendation categories for Shoes
INSERT INTO recommendation_categories (product_category_id, slug, title)
SELECT 
  pc.id,
  slug,
  title
FROM (
  VALUES 
    ('no-hands', 'Best "No Hands" Shoes of 2025')
) AS data(slug, title)
CROSS JOIN product_categories pc
WHERE pc.slug = 'shoes';

-- Insert recommendation categories for Not Just Shoes
INSERT INTO recommendation_categories (product_category_id, slug, title)
SELECT 
  pc.id,
  slug,
  title
FROM (
  VALUES 
    ('best-inserts', 'Best Inserts and Pads of 2025'),
    ('lifestyle-accessories', 'Best Lifestyle Accessories of 2025'),
    ('athletic-wear', 'Top Athletic Wear Collections of 2025'),
    ('fashion-essentials', 'Must-Have Fashion Essentials of 2025'),
    ('sustainable-products', 'Best Sustainable Products of 2025')
) AS data(slug, title)
CROSS JOIN product_categories pc
WHERE pc.slug = 'not-just-shoes'; 
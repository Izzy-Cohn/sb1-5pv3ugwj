# Product Data JSON Files

This directory contains JSON files for product data used in the Admin Page upload feature.

## Folder Structure

The folder structure mirrors the website's categories and recommendation types:

- `/sneakers`: Athletic footwear products
  - `/flat-feet`: Products for people with flat feet
  - `/normal-high-arches`: Products for normal to high arches
  - `/knee-and-hip-pain`: Products that help with knee and hip pain
  - `/heel-pain`: Products for heel pain relief
  - `/ball-of-foot-pain`: Products that address ball-of-foot discomfort
- `/sandals`: Open footwear products
  - `/flat-feet`: Sandals for flat feet
  - `/normal-high-arches`: Sandals for normal to high arches
  - `/knee-and-hip-pain`: Sandals that help with knee and hip pain
- `/slippers`: Indoor footwear
  - `/flat-feet`: Slippers for flat feet
  - `/normal-high-arches`: Slippers for normal to high arches
  - `/knee-and-hip-pain`: Slippers that help with knee and hip pain
- `/shoes`: Other footwear categories
  - `/no-hands`: No-hands shoes for ease of use
- `/not-just-shoes`: Non-footwear products
  - `/best-inserts`: Insoles and foot pads
  - `/lifestyle-accessories`: Personal care and lifestyle products
  - `/athletic-wear`: Athletic clothing and accessories
  - `/fashion-essentials`: Essential fashion items
  - `/sustainable-products`: Eco-friendly and sustainable products

## JSON File Format

Each product JSON file includes:
- Basic product information (name, brand, description, price)
- Detailed content (longDescription, features, pros/cons)
- Media links (imageUrl, videoId)
- E-commerce data (amazonUrl)
- Metadata (dateGenerated, recommendation_category_id)

Note: The recommendation_category_id needs to match the correct category ID in your database.
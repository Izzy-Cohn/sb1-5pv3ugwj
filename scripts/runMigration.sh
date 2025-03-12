#!/bin/bash

# Check for required packages
if ! npm list @supabase/supabase-js --json > /dev/null 2>&1; then
  echo "Installing @supabase/supabase-js package..."
  npm install @supabase/supabase-js
fi

# Load environment variables from .env file
if [ -f .env ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' .env | xargs)
else
  echo ".env file not found. Make sure your Supabase credentials are available in environment variables."
fi

# Check if Supabase credentials are available
if [ -z "$VITE_SUPABASE_URL" ] || [ -z "$VITE_SUPABASE_ANON_KEY" ]; then
  echo "Error: Supabase URL or Anon Key is missing."
  echo "Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your .env file or environment."
  exit 1
fi

echo "Running product data migration..."
node scripts/migrateProductData.js 
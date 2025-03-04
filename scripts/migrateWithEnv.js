import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

// Load environment variables from .env file
try {
  const envFile = readFileSync(join(rootDir, '.env'), 'utf8');
  const envVars = envFile.split('\n').filter(line => line.trim() && !line.startsWith('#'));
  
  for (const env of envVars) {
    const [key, value] = env.split('=');
    if (key && value) {
      process.env[key.trim()] = value.trim();
    }
  }
  
  console.log('Environment variables loaded from .env file.');
} catch (error) {
  console.error('Failed to load .env file:', error.message);
  console.log('Make sure your Supabase credentials are available in environment variables.');
}

// Check if Supabase credentials are available
if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
  console.error('Error: Supabase URL or Anon Key is missing.');
  console.error('Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your .env file or environment.');
  process.exit(1);
}

console.log('Supabase credentials found. Running migration script...');

// Run the migration script
try {
  // Import relative to this file
  const migrationPath = join(__dirname, 'migrateProductData.js');
  // Run the migration directly as a module
  import(migrationPath);
} catch (error) {
  console.error('Failed to run migration script:', error);
  process.exit(1);
} 
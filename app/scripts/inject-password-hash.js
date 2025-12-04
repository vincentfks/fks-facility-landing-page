import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import { config } from 'dotenv';

// Load .env file from app directory
const envPath = join(process.cwd(), '.env');
if (existsSync(envPath)) {
  config({ path: envPath });
} else {
  // Try parent directory if .env is at project root
  const parentEnvPath = join(process.cwd(), '..', '.env');
  if (existsSync(parentEnvPath)) {
    config({ path: parentEnvPath });
  }
}

const password = process.env.VITE_SUPPLIERS_PASSWORD;
const htmlPath = join(process.cwd(), 'public', 'fournisseurs.html');

if (!password) {
  console.warn('⚠️  VITE_SUPPLIERS_PASSWORD not set. Password protection will not work.');
  console.warn('   Set it in your .env file: VITE_SUPPLIERS_PASSWORD=your_password');
  process.exit(0);
}

// Generate SHA-256 hash of the password
const hash = createHash('sha256').update(password).digest('hex');

console.log('✅ Password hash generated successfully');

// Read the HTML file
let html = readFileSync(htmlPath, 'utf8');

// Replace the placeholder with the actual hash
html = html.replace('__PASSWORD_HASH_PLACEHOLDER__', hash);

// Write back to file
writeFileSync(htmlPath, html, 'utf8');

console.log('✅ Password hash injected into fournisseurs.html');


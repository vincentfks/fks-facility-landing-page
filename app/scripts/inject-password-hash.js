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

// Replace only the placeholder in the window.SUPPLIERS_PASSWORD_HASH assignment
// We use a regex to be more specific and only replace the one in the script tag at the top
const regex = /window\.SUPPLIERS_PASSWORD_HASH\s*=\s*['"]__PASSWORD_HASH_PLACEHOLDER__['"]/;
if (regex.test(html)) {
  html = html.replace(regex, `window.SUPPLIERS_PASSWORD_HASH = '${hash}'`);
  console.log('✅ Password hash injected into fournisseurs.html');
  console.log(`   Hash: ${hash.substring(0, 16)}...`);
} else {
  // Fallback: check if already replaced or try direct replacement
  if (!html.includes('__PASSWORD_HASH_PLACEHOLDER__')) {
    console.log('⚠️  Placeholder not found. Hash may already be injected.');
  } else {
    // Last resort: replace all (should not happen if structure is correct)
    html = html.replace('window.SUPPLIERS_PASSWORD_HASH = \'__PASSWORD_HASH_PLACEHOLDER__\'', `window.SUPPLIERS_PASSWORD_HASH = '${hash}'`);
    console.log('✅ Password hash injected (fallback method)');
  }
}

// Write back to file
writeFileSync(htmlPath, html, 'utf8');


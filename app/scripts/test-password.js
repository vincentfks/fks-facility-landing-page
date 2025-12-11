import { createHash } from 'crypto';
import { config } from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';

// Load .env
const envPath = join(process.cwd(), '.env');
if (existsSync(envPath)) {
  config({ path: envPath });
}

const password = process.env.VITE_SUPPLIERS_PASSWORD;

if (!password) {
  console.error('❌ VITE_SUPPLIERS_PASSWORD is not set in .env file');
  process.exit(1);
}

const hash = createHash('sha256').update(password).digest('hex');
console.log('✅ Password configured');
console.log(`   Hash: ${hash}`);
console.log(`\n📝 To test: Enter the password "${password.substring(0, 3)}***" on the fournisseurs.html page`);
console.log(`\n⚠️  Make sure to restart your dev server after setting VITE_SUPPLIERS_PASSWORD`);


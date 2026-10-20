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

if (!password) {
  console.error('❌ VITE_SUPPLIERS_PASSWORD not set. Password protection is required.');
  console.error('   Set it in your .env file: VITE_SUPPLIERS_PASSWORD=your_password');
  console.error('   The page /fournisseurs requires password protection to function.');
  process.exit(1); // Fail hard - password is required
}

// Generate SHA-256 hash of the password
const hash = createHash('sha256').update(password).digest('hex');

// Write hash to .env.local for Vite to pick up
const envLocalPath = join(process.cwd(), '.env.local');
let envContent = '';

// Read existing .env.local if it exists
if (existsSync(envLocalPath)) {
  envContent = readFileSync(envLocalPath, 'utf8');
}

// Check if VITE_SUPPLIERS_PASSWORD_HASH already exists and is the same
const hashRegex = /^VITE_SUPPLIERS_PASSWORD_HASH=(.*)$/m;
const existingMatch = envContent.match(hashRegex);

// Only write if hash doesn't exist or has changed (optimization: skip unnecessary writes)
if (!existingMatch || existingMatch[1] !== hash) {
  if (hashRegex.test(envContent)) {
    // Replace existing hash
    envContent = envContent.replace(hashRegex, `VITE_SUPPLIERS_PASSWORD_HASH=${hash}`);
  } else {
    // Append new hash
    envContent = envContent ? `${envContent}\nVITE_SUPPLIERS_PASSWORD_HASH=${hash}` : `VITE_SUPPLIERS_PASSWORD_HASH=${hash}`;
  }

  // Write back to .env.local
  writeFileSync(envLocalPath, envContent, 'utf8');
  console.log('✅ Password hash updated in .env.local');
} else {
  // Hash is already correct, skip write (much faster)
  // console.log('✓ Password hash already up to date');
}


/**
 * Security utilities for input sanitization and validation
 */

/**
 * Sanitize string input to prevent XSS attacks
 * Escapes HTML entities to prevent injection
 */
export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '');
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (French format)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Sanitize and validate contact data
 */
export const sanitizeContactData = (data: {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
  [key: string]: any;
}) => {
  const sanitized: any = {};

  if (data.name) {
    sanitized.name = sanitizeInput(data.name).substring(0, 255);
    if (sanitized.name.length < 2) {
      throw new Error('Le nom doit contenir au moins 2 caractères');
    }
  }

  if (data.email) {
    sanitized.email = sanitizeInput(data.email).toLowerCase().substring(0, 255);
    if (!isValidEmail(sanitized.email)) {
      throw new Error('Format d\'email invalide');
    }
  }

  if (data.phone) {
    sanitized.phone = sanitizeInput(data.phone).substring(0, 50);
    if (sanitized.phone && !isValidPhone(sanitized.phone)) {
      // Phone validation is optional, just log warning
      console.warn('Format de téléphone potentiellement invalide');
    }
  }

  if (data.company) {
    sanitized.company = sanitizeInput(data.company).substring(0, 255);
  }

  if (data.employees_range) {
    sanitized.employees_range = sanitizeInput(data.employees_range).substring(0, 50);
  }

  if (data.sector) {
    sanitized.sector = sanitizeInput(data.sector).substring(0, 100);
  }

  if (data.supplies_interests) {
    sanitized.supplies_interests = sanitizeInput(data.supplies_interests).substring(0, 255);
  }

  if (data.message) {
    sanitized.message = sanitizeInput(data.message).substring(0, 5000);
  }

  if (data.current_spending) {
    sanitized.current_spending = data.current_spending;
  }

  if (data.source) {
    sanitized.source = sanitizeInput(data.source).substring(0, 50);
  }

  return sanitized;
};

/**
 * Rate limiting helper (client-side, basic)
 */
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

export const checkRateLimit = (key: string, maxRequests: number = 5, windowMs: number = 900000): boolean => {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
};


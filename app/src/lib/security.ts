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
 * Sanitize string for HTML display (less aggressive, preserves basic formatting)
 */
export const sanitizeForHtml = (input: string): string => {
  if (typeof input !== 'string') return '';
  
  return input
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
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

  // Name is required
  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Le nom est requis');
  }
  sanitized.name = data.name.trim().substring(0, 255);
  if (sanitized.name.length < 2) {
    throw new Error('Le nom doit contenir au moins 2 caractères');
  }

  // Email is required
  if (!data.email || typeof data.email !== 'string') {
    throw new Error('L\'email est requis');
  }
  sanitized.email = data.email.trim().toLowerCase().substring(0, 255);
  if (!isValidEmail(sanitized.email)) {
    throw new Error('Format d\'email invalide');
  }

  // Optional fields
  if (data.phone && typeof data.phone === 'string') {
    sanitized.phone = data.phone.trim().substring(0, 50);
    if (sanitized.phone && !isValidPhone(sanitized.phone)) {
      // Phone validation is optional, just log warning
      console.warn('Format de téléphone potentiellement invalide:', sanitized.phone);
    }
  }

  if (data.company && typeof data.company === 'string') {
    sanitized.company = data.company.trim().substring(0, 255);
  }

  if (data.employees_range && typeof data.employees_range === 'string') {
    sanitized.employees_range = data.employees_range.trim().substring(0, 50);
  }

  if (data.sector && typeof data.sector === 'string') {
    sanitized.sector = data.sector.trim().substring(0, 100);
  }

  if (data.supplies_interests && typeof data.supplies_interests === 'string') {
    sanitized.supplies_interests = data.supplies_interests.trim().substring(0, 255);
  }

  if (data.message && typeof data.message === 'string') {
    sanitized.message = data.message.trim().substring(0, 5000);
  }

  if (data.current_spending !== undefined && data.current_spending !== null) {
    const spending = typeof data.current_spending === 'number' 
      ? data.current_spending 
      : parseFloat(String(data.current_spending));
    if (!isNaN(spending) && spending >= 0) {
      sanitized.current_spending = spending;
    }
  }

  if (data.source && typeof data.source === 'string') {
    sanitized.source = data.source.trim().substring(0, 50);
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


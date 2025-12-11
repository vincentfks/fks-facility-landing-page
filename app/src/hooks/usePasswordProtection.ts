import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'fks_suppliers_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 heures

// Get password hash from environment variable (injected at build time)
const EXPECTED_HASH = import.meta.env.VITE_SUPPLIERS_PASSWORD_HASH || '__PASSWORD_HASH_PLACEHOLDER__';
const isHashConfigured = EXPECTED_HASH && EXPECTED_HASH !== '__PASSWORD_HASH_PLACEHOLDER__';

// SHA-256 hash function
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

// Check if user is already authenticated
function checkAuth(): boolean {
  if (!isHashConfigured) {
    return false;
  }
  
  const authData = localStorage.getItem(STORAGE_KEY);
  if (authData) {
    try {
      const { timestamp } = JSON.parse(authData);
      const now = Date.now();
      
      if (now - timestamp < SESSION_DURATION) {
        return true;
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
  return false;
}

export function usePasswordProtection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Always block access if hash is not configured
    if (!isHashConfigured) {
      console.warn('⚠️ Password hash not configured. Page access blocked.');
      setIsAuthenticated(false);
      setIsLoading(false);
      return;
    }
    
    // Check authentication on mount
    const authenticated = checkAuth();
    setIsAuthenticated(authenticated);
    setIsLoading(false);
  }, []);

  const handleLogin = useCallback(async (password: string): Promise<boolean> => {
    if (!isHashConfigured) {
      setError('Configuration manquante. Vérifiez la console.');
      return false;
    }

    if (!password) {
      setError('Veuillez entrer un mot de passe');
      return false;
    }

    try {
      const enteredHash = await sha256(password);
      
      if (enteredHash === EXPECTED_HASH) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          timestamp: Date.now()
        }));
        setIsAuthenticated(true);
        setError('');
        return true;
      } else {
        setError('Mot de passe incorrect. Veuillez réessayer.');
        return false;
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      return false;
    }
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    isLoading,
    error,
    handleLogin,
    handleLogout,
    isHashConfigured,
  };
}


export interface ContactData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  employees_range?: string;
  sector?: string;
  message?: string;
  current_spending?: number;
  source?: 'contact' | 'simulation' | 'solution';
  supplies_interests?: string;
  // Anti-spam (honeypot + temps de remplissage), vérifiés côté serveur
  website?: string;
  form_elapsed_ms?: number;
}

export interface SimulationData extends ContactData {
  current_spending: number;
  sector: string;
}


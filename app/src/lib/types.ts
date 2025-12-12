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
}

export interface SimulationData extends ContactData {
  current_spending: number;
  sector: string;
}


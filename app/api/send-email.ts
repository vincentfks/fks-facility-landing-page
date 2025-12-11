/**
 * API Route Vercel - Envoyer un email via Resend
 * 
 * Endpoint: POST /api/send-email
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { generateEmailHtml } from '../../src/lib/email-template';

// Initialiser Resend avec la clé API
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.error("❌ RESEND_API_KEY non configurée dans les variables d'environnement");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface ContactData {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Seulement POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false,
      error: 'Method not allowed' 
    });
  }

  try {
    const data: ContactData = req.body;

    // Validation basique
    if (!data.name || !data.email) {
      return res.status(400).json({ 
        success: false,
        error: 'name and email are required' 
      });
    }

    // Vérifier que la clé API est configurée
    if (!resendApiKey || !resend) {
      console.error("❌ RESEND_API_KEY non configurée");
      return res.status(500).json({ 
        success: false,
        error: 'Clé API Resend non configurée' 
      });
    }

    // Get recipient email from env or default
    const recipientEmail = process.env.ADMIN_EMAIL || process.env.TO_EMAIL || 'franck.k@fks-facility.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'FKS Facility <onboarding@resend.dev>';

    // Generate email HTML
    const emailHtml = generateEmailHtml(data);

    const subject = `Nouvelle demande FKS (${data.source || 'contact'}): ${data.company || data.name}`;

    console.log('📧 Envoi email via Resend:', {
      to: recipientEmail,
      from: fromEmail,
      subject,
    });

    // Envoyer l'email via Resend
    const result = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject,
      html: emailHtml,
      replyTo: data.email, // Permet de répondre directement au client
    });

    if (result.error) {
      console.error("❌ Erreur Resend:", result.error);
      return res.status(500).json({ 
        success: false,
        error: "Erreur lors de l'envoi",
        message: result.error.message || 'Erreur inconnue'
      });
    }

    console.log('✅ Email envoyé avec succès:', result.data?.id);
    return res.status(200).json({ 
      success: true, 
      message: "Email envoyé avec succès",
      id: result.data?.id
    });

  } catch (error: any) {
    console.error("❌ Erreur:", error);
    return res.status(500).json({ 
      success: false,
      error: "Erreur serveur",
      message: error.message || 'Erreur inconnue'
    });
  }
}


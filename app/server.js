/**
 * Simple Express server for local development
 * Proxies API routes to Resend
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import { generateEmailHtml } from './lib/email-template.js';

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Initialiser Resend avec la clé API
const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;

if (!resendApiKey) {
  console.error("❌ RESEND_API_KEY non configurée dans .env");
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

app.post('/api/send-email', async (req, res) => {
  try {
    const data = req.body;

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

    const recipientEmail = process.env.ADMIN_EMAIL || process.env.TO_EMAIL || 'franck.k@fks-facility.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'FKS Facility <onboarding@resend.dev>';

    const emailHtml = generateEmailHtml(data);
    const subject = `Nouvelle demande FKS (${data.source || 'contact'}): ${data.company || data.name}`;

    console.log('📧 Envoi email via Resend:', {
      to: recipientEmail,
      from: fromEmail,
      subject,
    });

    // Envoyer l'email via Resend
    const { data: result, error } = await resend.emails.send({
      from: fromEmail,
      to: [recipientEmail],
      subject,
      html: emailHtml,
      replyTo: data.email, // Permet de répondre directement au client
    });

    if (error) {
      console.error("❌ Erreur Resend:", error);
      return res.status(500).json({ 
        success: false,
        error: "Erreur lors de l'envoi",
        message: error.message || 'Erreur inconnue'
      });
    }

    console.log('✅ Email envoyé avec succès:', result?.id);
    return res.status(200).json({ 
      success: true, 
      message: "Email envoyé avec succès",
      id: result?.id
    });

  } catch (error) {
    console.error("❌ Erreur:", error);
    return res.status(500).json({ 
      success: false,
      error: "Erreur serveur",
      message: error.message || 'Erreur inconnue'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Dev server running on http://localhost:${PORT}`);
  console.log(`📧 API endpoint: http://localhost:${PORT}/api/send-email`);
});


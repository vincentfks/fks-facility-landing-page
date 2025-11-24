import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const quickReplies = [
  "Comment fonctionne l'adhésion ?",
  'Quels sont vos tarifs ?',
  'Quelles économies puis-je faire ?',
];

const botResponses: Record<string, string> = {
  'adhésion': "L'adhésion est simple : choisissez votre formule selon la taille de votre entreprise, payez la cotisation annuelle, et vous avez immédiatement accès à tous nos tarifs négociés. Aucun engagement ni minimum requis !",
  'tarif': 'Nous proposons 4 formules adaptées à la taille de votre entreprise : 90€/an pour 1-10 salariés, 150€/an pour 10-20 salariés, 300€/an pour 20-50 salariés, et sur devis pour plus de 50 salariés.',
  'économie': 'En moyenne, nos clients réalisent des économies significatives. Certains secteurs peuvent même atteindre jusqu\'à -70% sur certaines catégories de produits !',
};

const getBotResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes('adhésion') || lowerMessage.includes('adhérer')) {
    return botResponses['adhésion'];
  }
  if (lowerMessage.includes('tarif') || lowerMessage.includes('prix') || lowerMessage.includes('cout')) {
    return botResponses['tarif'];
  }
  if (lowerMessage.includes('économ') || lowerMessage.includes('sauver') || lowerMessage.includes('réduit')) {
    return botResponses['économie'];
  }
  return "Merci pour votre message ! Notre équipe vous répondra dans les plus brefs délais. En attendant, n'hésitez pas à consulter notre page Tarifs ou à remplir notre formulaire de contact.";
};

export const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Bonjour ! 👋 Je suis là pour répondre à vos questions sur FKS Facility. Comment puis-je vous aider ?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  // Auto-open after 30 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');

    // Bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  return (
    <>
      {/* Chat button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary-500 text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors flex items-center justify-center"
          aria-label="Ouvrir le chat"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] max-w-md h-[600px] bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-500 text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">FKS Facility</h3>
                <p className="text-sm text-primary-100">En ligne</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-600 rounded transition-colors"
                aria-label="Fermer le chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick replies */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 space-y-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => sendMessage(reply)}
                    className="block w-full text-left px-4 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
              <div className="flex items-center space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Tapez votre message..."
                  className="flex-1"
                />
                <Button type="submit" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Ou{' '}
                <Link to="/contact" className="text-primary-500 hover:underline">
                  remplissez notre formulaire
                </Link>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};


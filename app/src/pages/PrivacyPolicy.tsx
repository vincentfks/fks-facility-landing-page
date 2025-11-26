import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Database, Target, Clock, Scale, Cookie, Mail } from 'lucide-react';

export const PrivacyPolicy: React.FC = () => {
  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-primary-600 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-8">
            Politique de Confidentialité
          </h1>

          <div className="space-y-12 text-gray-600">
            {/* Collecte des données */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Collecte des données</h2>
                <p className="mb-4">
                  Nous collectons les données personnelles que vous nous fournissez volontairement via nos formulaires de contact, notamment :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center">• <span className="ml-2">Nom et prénom</span></li>
                  <li className="flex items-center">• <span className="ml-2">Adresse e-mail</span></li>
                  <li className="flex items-center">• <span className="ml-2">Nom de l'entreprise</span></li>
                  <li className="flex items-center">• <span className="ml-2">Message et informations sur votre projet</span></li>
                </ul>
              </div>
            </section>

            {/* Utilisation des données */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center text-secondary-600">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Utilisation des données</h2>
                <p className="mb-4">Vos données personnelles sont utilisées pour :</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex items-center">• <span className="ml-2">Répondre à vos demandes de contact</span></li>
                  <li className="flex items-center">• <span className="ml-2">Vous fournir nos services de centrale d'achat et d'optimisation des coûts</span></li>
                  <li className="flex items-center">• <span className="ml-2">Améliorer notre site web et nos services</span></li>
                  <li className="flex items-center">• <span className="ml-2">Traiter vos demandes d'adhésion et de partenariat</span></li>
                  <li className="flex items-center">• <span className="ml-2">Planifier et organiser nos échanges</span></li>
                </ul>
                <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm font-medium border border-yellow-100">
                  Important : Vos données ne seront pas utilisées à des fins marketing ou commerciales sans votre consentement explicite.
                </div>
              </div>
            </section>

            {/* Conservation des données */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Conservation des données</h2>
                <p className="mb-2">
                  Nous conservons vos données personnelles pendant 10 ans ou jusqu'à ce que vous demandiez leur suppression.
                </p>
                <p>
                  Cette durée correspond à nos obligations légales et à la nécessité de maintenir un historique de nos relations commerciales.
                </p>
              </div>
            </section>

            {/* Vos droits */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Vos droits</h2>
                <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="space-y-3 ml-4 mb-4">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 whitespace-nowrap">• Droit d'accès :</span>
                    <span>connaître les données que nous détenons sur vous</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 whitespace-nowrap">• Droit de rectification :</span>
                    <span>corriger des données inexactes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 whitespace-nowrap">• Droit à l'effacement :</span>
                    <span>demander la suppression de vos données</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 whitespace-nowrap">• Droit à la portabilité :</span>
                    <span>récupérer vos données dans un format structuré</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 whitespace-nowrap">• Droit d'opposition :</span>
                    <span>vous opposer au traitement de vos données</span>
                  </li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous via notre <Link to="/contact" className="text-primary-600 hover:underline">formulaire de contact</Link>.
                </p>
              </div>
            </section>

            {/* Cookies */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
                <p className="mb-4">Nous utilisons des cookies pour améliorer votre expérience de navigation :</p>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex items-center">• <span className="ml-2">Google Analytics : cookies de performance pour analyser l'utilisation du site</span></li>
                  <li className="flex items-center">• <span className="ml-2">Cookies de session : pour maintenir votre session de navigation</span></li>
                </ul>
                <p>
                  Vous pouvez accepter, refuser ou paramétrer leur gestion via votre navigateur.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
                <p className="mb-4">
                  Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits, vous pouvez nous contacter :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center">• <Link to="/contact" className="ml-2 text-primary-600 hover:underline">Via notre formulaire de contact</Link></li>
                  <li className="flex items-center">• <Link to="/contact" className="ml-2 text-primary-600 hover:underline">En réservant un appel découverte</Link></li>
                </ul>
              </div>
            </section>

            <div className="pt-8 border-t border-gray-100 text-sm text-gray-500 text-right">
              Dernière mise à jour : 25/11/2025
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};


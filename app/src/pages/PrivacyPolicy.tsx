import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Building2, Shield, Database, Target, Clock, Scale, Globe, Cookie, Users, Mail } from 'lucide-react';

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
            {/* Responsable du traitement */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Responsable du traitement</h2>
                <p className="mb-1">FKS FACILITY, SARL au capital de 5 000 €</p>
                <p className="mb-1">15 rue Lucien Sergent, 91300 Massy</p>
                <p className="mb-1">SIRET : 910 470 988 00015</p>
                <p className="mb-1">
                  Email :{' '}
                  <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">
                    franck.k@fks-facility.com
                  </a>
                </p>
                <p>Téléphone : 06 14 27 57 00</p>
              </div>
            </section>

            {/* Base légale des traitements */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Base légale des traitements</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalité</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Base légale</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-gray-200">Gestion de l'adhésion et facturation</td>
                        <td className="p-3 border border-gray-200">Exécution contractuelle (art. 6.1.b RGPD)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200">Amélioration du site et prospection commerciale</td>
                        <td className="p-3 border border-gray-200">Intérêt légitime (art. 6.1.f RGPD)</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">Cookies analytiques et marketing</td>
                        <td className="p-3 border border-gray-200">Consentement (art. 6.1.a RGPD)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Données collectées */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Données collectées</h2>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <strong>Via formulaires :</strong> nom, prénom, email, entreprise, message
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <strong>Via adhésion Stripe :</strong> nom, email, adresse de facturation (les données bancaires
                      sont traitées exclusivement par Stripe)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <strong>Via navigation :</strong> adresse IP, pages consultées, navigateur, système
                      d'exploitation
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Finalités du traitement */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-secondary-50 flex items-center justify-center text-secondary-600">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Finalités du traitement</h2>
                <ul className="space-y-2 ml-4 mb-4">
                  <li className="flex items-center">• <span className="ml-2">Répondre à vos demandes de contact</span></li>
                  <li className="flex items-center">• <span className="ml-2">Gérer votre adhésion et facturation</span></li>
                  <li className="flex items-center">• <span className="ml-2">Fournir nos services de centrale d'achat</span></li>
                  <li className="flex items-center">• <span className="ml-2">Améliorer notre site web et nos services</span></li>
                  <li className="flex items-center">• <span className="ml-2">Prospection commerciale (avec consentement)</span></li>
                </ul>
                <div className="bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm font-medium border border-yellow-100">
                  Important : Vos données ne seront pas utilisées à des fins marketing sans votre consentement
                  explicite.
                </div>
              </div>
            </section>

            {/* Durée de conservation */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Durée de conservation</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">
                          Type de données
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">
                          Durée de conservation
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-gray-200">Données clients/adhérents</td>
                        <td className="p-3 border border-gray-200">
                          Durée de la relation contractuelle + 5 ans
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200">Données comptables et de facturation</td>
                        <td className="p-3 border border-gray-200">
                          10 ans (obligation légale, art. L.123-22 Code de commerce)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">Cookies</td>
                        <td className="p-3 border border-gray-200">13 mois maximum (recommandation CNIL)</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200">Logs de navigation</td>
                        <td className="p-3 border border-gray-200">12 mois</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">Données de prospection</td>
                        <td className="p-3 border border-gray-200">3 ans après le dernier contact</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Sous-traitants */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Sous-traitants</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">
                          Sous-traitant
                        </th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalité</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Pays</th>
                        <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">
                          Garanties
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border border-gray-200">Stripe Technology Europe Ltd</td>
                        <td className="p-3 border border-gray-200">Paiement sécurisé</td>
                        <td className="p-3 border border-gray-200">Irlande / États-Unis</td>
                        <td className="p-3 border border-gray-200">Clauses contractuelles types</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200">Vercel Inc.</td>
                        <td className="p-3 border border-gray-200">Hébergement du site</td>
                        <td className="p-3 border border-gray-200">États-Unis</td>
                        <td className="p-3 border border-gray-200">Clauses contractuelles types</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">Google LLC (Analytics / GTM)</td>
                        <td className="p-3 border border-gray-200">Mesure d'audience</td>
                        <td className="p-3 border border-gray-200">États-Unis</td>
                        <td className="p-3 border border-gray-200">Clauses contractuelles types</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200">Crisp IM SAS</td>
                        <td className="p-3 border border-gray-200">Chat et support client</td>
                        <td className="p-3 border border-gray-200">France</td>
                        <td className="p-3 border border-gray-200">RGPD</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">Axeptio</td>
                        <td className="p-3 border border-gray-200">Gestion du consentement cookies</td>
                        <td className="p-3 border border-gray-200">France</td>
                        <td className="p-3 border border-gray-200">RGPD</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200">Rybbit</td>
                        <td className="p-3 border border-gray-200">Analytique de navigation</td>
                        <td className="p-3 border border-gray-200">États-Unis</td>
                        <td className="p-3 border border-gray-200">Clauses contractuelles types</td>
                      </tr>
                      <tr>
                        <td className="p-3 border border-gray-200">Resend Inc.</td>
                        <td className="p-3 border border-gray-200">Emails transactionnels</td>
                        <td className="p-3 border border-gray-200">États-Unis</td>
                        <td className="p-3 border border-gray-200">Clauses contractuelles types</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="p-3 border border-gray-200">Lemlist SAS</td>
                        <td className="p-3 border border-gray-200">Marketing automation</td>
                        <td className="p-3 border border-gray-200">France</td>
                        <td className="p-3 border border-gray-200">RGPD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Transferts hors UE */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Transferts hors UE</h2>
                <p>
                  Certains de nos sous-traitants sont situés en dehors de l'Union Européenne, notamment aux
                  États-Unis. Ces transferts sont encadrés par des clauses contractuelles types approuvées par la
                  Commission européenne (article 46 du RGPD), garantissant un niveau de protection adéquat de vos
                  données.
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
                    <span>connaître les données détenues sur vous</span>
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
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 whitespace-nowrap">• Droit à la limitation :</span>
                    <span>demander la limitation du traitement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2 whitespace-nowrap">• Droit de retrait du consentement :</span>
                    <span>retirer votre consentement à tout moment pour les traitements basés sur celui-ci</span>
                  </li>
                </ul>
                <p className="mb-4">
                  Pour exercer ces droits :{' '}
                  <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">
                    franck.k@fks-facility.com
                  </a>{' '}
                  ou par courrier à FKS FACILITY, 15 rue Lucien Sergent, 91300 Massy.
                </p>
                <div className="bg-purple-50 text-purple-800 px-4 py-3 rounded-lg text-sm font-medium border border-purple-100">
                  Vous disposez également du droit d'introduire une réclamation auprès de la Commission Nationale de
                  l'Informatique et des Libertés (CNIL) — 3 Place de Fontenoy, TSA 80715, 75334 Paris Cedex 07 —{' '}
                  <a
                    href="https://www.cnil.fr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-purple-900"
                  >
                    www.cnil.fr
                  </a>
                </div>
              </div>
            </section>

            {/* Cookies */}
            <section className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                <Cookie className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
                <p>
                  Nous utilisons des cookies soumis à votre consentement via notre gestionnaire Axeptio. Pour plus
                  d'informations, consultez notre{' '}
                  <Link to="/cookies" className="text-primary-600 hover:underline">
                    politique relative aux cookies
                  </Link>
                  .
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
                  Pour toute question relative à cette politique ou pour exercer vos droits :
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-center">
                    •{' '}
                    <Link to="/contact" className="ml-2 text-primary-600 hover:underline">
                      Via notre formulaire de contact
                    </Link>
                  </li>
                  <li className="flex items-center">
                    • <span className="ml-2">Par email : </span>
                    <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline ml-1">
                      franck.k@fks-facility.com
                    </a>
                  </li>
                  <li className="flex items-center">
                    • <span className="ml-2">Par courrier : FKS FACILITY, 15 rue Lucien Sergent, 91300 Massy</span>
                  </li>
                </ul>
              </div>
            </section>

            <div className="pt-8 border-t border-gray-100 text-sm text-gray-500 text-right">
              Dernière mise à jour : 15/09/2026
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

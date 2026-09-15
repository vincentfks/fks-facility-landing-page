import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const Cookies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
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
            Politique relative aux cookies
          </h1>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site web. Il permet à son émetteur d'identifier le terminal dans lequel il est enregistré, pendant la durée de validité ou d'enregistrement du cookie concerné.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Gestionnaire de consentement</h2>
              <p className="mb-4">
                Nous utilisons <strong>Axeptio</strong> comme gestionnaire de consentement aux cookies. Lors de votre première visite, un bandeau vous permet d'accepter ou de refuser chaque catégorie de cookies. Vous pouvez modifier vos choix à tout moment en cliquant sur le bouton ci-dessous.
              </p>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="mb-3 font-medium text-gray-900">Modifier vos préférences :</p>
                <Button
                  variant="outline"
                  onClick={() => window.axeptioSDK?.openCookies()}
                >
                  Gérer mes préférences
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Pourquoi utilisons-nous des cookies ?</h2>
              <p className="mb-4">
                Nous utilisons des cookies pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Assurer le bon fonctionnement de notre site (cookies strictement nécessaires) ;</li>
                <li>Mémoriser vos préférences de consentement ;</li>
                <li>Analyser l'audience et les performances de notre site (cookies analytiques) ;</li>
                <li>Vous proposer une assistance via le chat en ligne (cookies fonctionnels) ;</li>
                <li>Mesurer l'efficacité de nos campagnes marketing (cookies marketing).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Liste détaillée des cookies utilisés</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Cookies strictement nécessaires</h3>
                  <p className="mb-3 text-sm">Ces cookies sont indispensables au fonctionnement du site. Ils ne requièrent pas votre consentement.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Cookie</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Éditeur</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalité</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-gray-200 font-mono text-xs">axeptio_*</td>
                          <td className="p-3 border border-gray-200">Axeptio</td>
                          <td className="p-3 border border-gray-200">Enregistrement de vos choix de consentement</td>
                          <td className="p-3 border border-gray-200">12 mois</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-3 border border-gray-200 font-mono text-xs">__stripe_*</td>
                          <td className="p-3 border border-gray-200">Stripe</td>
                          <td className="p-3 border border-gray-200">Sécurisation des transactions de paiement</td>
                          <td className="p-3 border border-gray-200">Session</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Cookies analytiques (soumis à consentement)</h3>
                  <p className="mb-3 text-sm">Ces cookies nous permettent de mesurer l'audience de notre site et d'en améliorer le fonctionnement.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Cookie</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Éditeur</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalité</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-gray-200 font-mono text-xs">_ga</td>
                          <td className="p-3 border border-gray-200">Google Analytics</td>
                          <td className="p-3 border border-gray-200">Distinction des visiteurs uniques</td>
                          <td className="p-3 border border-gray-200">13 mois</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-3 border border-gray-200 font-mono text-xs">_gid</td>
                          <td className="p-3 border border-gray-200">Google Analytics</td>
                          <td className="p-3 border border-gray-200">Distinction des visiteurs uniques</td>
                          <td className="p-3 border border-gray-200">24 heures</td>
                        </tr>
                        <tr>
                          <td className="p-3 border border-gray-200 font-mono text-xs">_ga_*</td>
                          <td className="p-3 border border-gray-200">Google Analytics</td>
                          <td className="p-3 border border-gray-200">Persistance de l'état de session</td>
                          <td className="p-3 border border-gray-200">13 mois</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="p-3 border border-gray-200 font-mono text-xs">rybbit_*</td>
                          <td className="p-3 border border-gray-200">Rybbit</td>
                          <td className="p-3 border border-gray-200">Mesure d'audience respectueuse de la vie privée</td>
                          <td className="p-3 border border-gray-200">13 mois</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Cookies fonctionnels (soumis à consentement)</h3>
                  <p className="mb-3 text-sm">Ces cookies permettent d'améliorer votre expérience sur le site.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Cookie</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Éditeur</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalité</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-gray-200 font-mono text-xs">crisp-client/*</td>
                          <td className="p-3 border border-gray-200">Crisp</td>
                          <td className="p-3 border border-gray-200">Chat en ligne et support client</td>
                          <td className="p-3 border border-gray-200">Session / 6 mois</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Cookies marketing (soumis à consentement)</h3>
                  <p className="mb-3 text-sm">Ces cookies permettent de mesurer l'efficacité de nos campagnes.</p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Cookie</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Éditeur</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Finalité</th>
                          <th className="text-left p-3 font-semibold text-gray-900 border border-gray-200">Durée</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="p-3 border border-gray-200 font-mono text-xs">lemlist_*</td>
                          <td className="p-3 border border-gray-200">Lemlist</td>
                          <td className="p-3 border border-gray-200">Suivi des campagnes marketing et emailing</td>
                          <td className="p-3 border border-gray-200">12 mois</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Vos choix concernant les cookies</h2>
              <p className="mb-4">
                Vous pouvez à tout moment modifier vos préférences en matière de cookies :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Via notre gestionnaire de consentement Axeptio (bouton « Gérer mes préférences » ci-dessus) ;</li>
                <li>Via les paramètres de votre navigateur ;</li>
                <li>En supprimant les cookies déjà déposés sur votre terminal.</li>
              </ul>
              <p>
                Nous vous rappelons que le refus de certains cookies peut limiter votre accès à certaines fonctionnalités du site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">6. Durée de conservation</h2>
              <p>
                Conformément aux recommandations de la CNIL, la durée maximale de conservation des cookies est de 13 mois après leur premier dépôt dans votre terminal. La validité de votre consentement est également de 13 mois maximum, après quoi il vous sera de nouveau demandé.
              </p>
            </section>

            <section className="pt-8 border-t border-gray-100">
              <p className="font-medium mb-4">
                Pour plus d'informations sur les cookies, consultez le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.cnil.fr</a>
              </p>
              <p className="font-medium">
                Pour toute question, consultez notre <Link to="/confidentialite" className="text-primary-600 hover:underline">politique de confidentialité</Link>.
              </p>
            </section>

            <div className="pt-4 text-sm text-gray-500 text-right">
              Dernière mise à jour : 15/09/2026
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

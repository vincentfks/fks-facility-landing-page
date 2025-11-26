import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const Cookies: React.FC = () => {
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
            Politique relative aux cookies
          </h1>

          <div className="space-y-8 text-gray-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site ou de la consultation d'une publicité. Il permet à son émetteur d'identifier le terminal dans lequel il est enregistré, pendant la durée de validité ou d'enregistrement du cookie concerné.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Pourquoi utilisons-nous des cookies ?</h2>
              <p className="mb-4">
                Nous utilisons des cookies pour :
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Assurer le bon fonctionnement de notre site (cookies strictement nécessaires).</li>
                <li>Améliorer votre expérience utilisateur (mémorisation de vos préférences).</li>
                <li>Analyser l'audience et les performances de notre site (statistiques de navigation).</li>
                <li>Vous proposer du contenu adapté à vos centres d'intérêt.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Types de cookies utilisés</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Cookies techniques et fonctionnels</h3>
                  <p>
                    Ces cookies sont indispensables à la navigation sur notre site. Ils vous permettent d'utiliser les principales fonctionnalités du site et de sécuriser votre connexion. Sans ces cookies, vous ne pourrez pas utiliser notre site normalement.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Cookies analytiques</h3>
                  <p>
                    Il s'agit de cookies qui nous permettent de connaître l'utilisation et les performances de notre site et d'en améliorer le fonctionnement (par exemple, les pages le plus souvent consultées, les recherches des internautes...).
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">4. Vos choix concernant les cookies</h2>
              <p className="mb-4">
                Vous pouvez à tout moment choisir de désactiver ces cookies. Votre navigateur peut également être paramétré pour vous signaler les cookies qui sont déposés dans votre ordinateur et vous demander de les accepter ou non.
              </p>
              <p className="mb-4">
                Vous pouvez accepter ou refuser les cookies au cas par cas ou bien les refuser systématiquement une fois pour toutes. Nous vous rappelons que le paramétrage est susceptible de modifier vos conditions d'accès à nos services nécessitant l'utilisation de cookies.
              </p>
              <p className="mb-4">
                Pour la gestion des cookies et de vos choix, la configuration de chaque navigateur est différente. Elle est décrite dans le menu d'aide de votre navigateur, qui vous permettra de savoir de quelle manière modifier vos souhaits en matière de cookies.
              </p>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="mb-3 font-medium text-gray-900">Modifier vos préférences via notre gestionnaire :</p>
                <Button 
                  variant="outline" 
                  onClick={() => window.axeptioSDK?.openCookies()}
                >
                  Gérer mes préférences
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">5. Durée de conservation</h2>
              <p>
                Conformément aux recommandations de la CNIL, la durée maximale de conservation des cookies est de 13 mois au maximum après leur premier dépôt dans le terminal de l'Utilisateur, tout comme la durée de la validité du consentement de l’Utilisateur à l’utilisation de ces cookies.
              </p>
            </section>

            <section className="pt-8 border-t border-gray-100">
              <p className="font-medium">
                Pour plus d'informations sur les cookies, vous pouvez consulter le site de la CNIL : <a href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};


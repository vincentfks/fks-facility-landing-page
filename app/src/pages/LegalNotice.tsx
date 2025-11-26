import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const LegalNotice: React.FC = () => {
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
            Mentions Légales
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Informations légales sur le site de fks-facility.com
          </p>

          <div className="space-y-8 text-gray-600">
            {/* Propriétaire */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Propriétaire du site FKS FACILITY</h2>
              <p className="mb-2">FKS FACILITY est une SARL enregistrée sous le numéro 89344618700013 au R.C.S. de Evry B 893 446 187.</p>
              <p className="mb-2">N° TVA Intracommunautaire: FR41893446187</p>
              <p className="mb-2">15 Rue Lucien Sergent, 91300 Massy</p>
              <p>Téléphone : 06 14 27 57 00</p>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hébergement du site de FKS FACILITY</h2>
              <p>
                Ce site internet est hébergé par l’Agence Saycom situé 243 rue Roger Salengro, 85000 La Roche-sur-Yon. 
                L’hébergeur est contactable par téléphone au 02 51 95 18 55.
              </p>
            </section>

            {/* Droit d'auteur */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Droit d’auteur – Copyright</h2>
              <p className="leading-relaxed">
                Tous les éléments de toute nature (images fixes, images animées, photographies, bases de données, marques, illustrations, logos, dessins, modèles, documents téléchargeable, etc) contenus dans ce site sont protégés par le droit d’auteur. A ce titre, sauf autorisation préalable et écrite de la société FKS FACILITY, toute reproduction, représentation, adaptation, modification partielle ou intégrale de tout élément composant le site, par quelque moyen que ce soit, est interdite sous peine de poursuite judiciaire.
              </p>
            </section>

            {/* Données personnelles */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Données personnelles</h2>
              <p className="mb-4">
                Les informations recueillies à partir du formulaire de contact font l’objet d’un traitement informatique destiné à la gestion de notre clientèle pour améliorer nos services.
              </p>
              <p className="mb-4">
                Conformément à la loi « informatique et libertés » du 6 janvier 1978 modifiée, vous disposez d’un droit d’accès et de rectification aux informations qui vous concernent.
              </p>
              <p className="mb-4">
                Vous pouvez accéder aux informations vous concernant en vous adressant à : <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">franck.k@fks-facility.com</a>
              </p>
              <p className="mb-4">
                Vous pouvez également, pour des motifs légitimes, vous opposer au traitement des données vous concernant.
              </p>
              <p>
                Pour en savoir plus, consultez vos droits sur le site de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">CNIL</a>.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="leading-relaxed">
                Notre site utilise des cookies. Ces fichiers stockés sur votre ordinateur nous servent à faciliter votre accès aux services que nous proposons. Les cookies du site ne contiennent pas de données permettant de vous identifier personnellement, et ils sont conçus pour être utilisés uniquement par FKS FACILITY. Nous vous informons que vous pouvez vous opposer à l’enregistrement de ces « cookies » en configurant votre ordinateur selon les modalités détaillées sur le site <a href="http://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">http://www.cnil.fr</a>.
              </p>
            </section>

            {/* Statistiques */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Utilisation à des fins statistiques d’informations relatives à la navigation</h2>
              <p className="mb-4">
                Quand vous accédez au site Internet, les serveurs consultés collectent automatiquement les données suivantes :
              </p>
              <ul className="list-disc list-inside mb-4 space-y-1 ml-4">
                <li>l’adresse IP qui vous est attribuée lors de la connexion ;</li>
                <li>la date et l’heure d’accès au site ;</li>
                <li>les pages consultées ;</li>
                <li>le type de navigateur utilisé ;</li>
                <li>le système d’exploitation installé sur le PC ;</li>
                <li>le moteur de recherche ainsi que les mots-clés utilisés pour retrouver le site.</li>
              </ul>
              <p>
                Ces informations ne sont conservées qu’à la seule fin de mesurer le nombre de visiteurs dans les différentes sections du site et d’y apporter des améliorations.
              </p>
            </section>

            {/* Liens hypertextes */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Liens hypertextes : responsabilité</h2>
              <p className="mb-4">
                Les liens hypertextes présents sur le site orientant les utilisateurs vers d’autres sites Internet n’engagent pas la responsabilité de FKS FACILITY quant au contenu de ces sites.
              </p>
              <p>
                La création d’un lien pointant vers notre site ne requiert pas d’autorisation. Nous dégageons toute responsabilité dans ce cas.
              </p>
            </section>

            {/* Contact */}
            <section className="pt-8 border-t border-gray-100">
              <p className="font-medium">
                Pour toute question relative à l’utilisation de ce site internet, adressez-nous un mail à l’adresse : <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">franck.k@fks-facility.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};


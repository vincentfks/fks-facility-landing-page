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
            {/* Éditeur du site */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Éditeur du site</h2>
              <p className="mb-2">FKS FACILITY</p>
              <p className="mb-2">Société à responsabilité limitée (SARL) au capital de 5 000 €</p>
              <p className="mb-2">Siège social : 15 rue Lucien Sergent, 91300 Massy</p>
              <p className="mb-2">SIRET : 910 470 988 00015</p>
              <p className="mb-2">RCS : Evry 910 470 988</p>
              <p className="mb-2">N° TVA Intracommunautaire : FR64910470988</p>
              <p className="mb-2">Téléphone : 06 14 27 57 00</p>
              <p className="mb-2">
                Email : <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">franck.k@fks-facility.com</a>
              </p>
              <p>Gérant : Franck KIRECHE</p>
            </section>

            {/* Directeur de la publication */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Directeur de la publication</h2>
              <p>Vincent Felisat</p>
            </section>

            {/* Hébergement */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Hébergement</h2>
              <p className="mb-2">Vercel Inc.</p>
              <p className="mb-2">440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p>
                Site web : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://vercel.com</a>
              </p>
            </section>

            {/* Prestataire de paiement */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Prestataire de paiement</h2>
              <p className="mb-4">
                Les paiements sont traités par Stripe Technology Europe Limited, dont le siège est situé 1 Grand Canal Street Lower, Grand Canal Dock, Dublin 2, Irlande.
              </p>
              <p className="mb-4">
                Stripe est certifié PCI DSS Level 1, le plus haut niveau de certification dans l'industrie du paiement.
              </p>
              <p>
                FKS Facility ne stocke, ne collecte ni ne traite directement aucune donnée bancaire. L'ensemble des transactions est sécurisé par Stripe.
              </p>
            </section>

            {/* Propriété intellectuelle */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Propriété intellectuelle</h2>
              <p className="leading-relaxed">
                Tous les éléments de toute nature (images fixes, images animées, photographies, bases de données, marques, illustrations, logos, dessins, modèles, documents téléchargeable, etc) contenus dans ce site sont protégés par le droit d'auteur. A ce titre, sauf autorisation préalable et écrite de la société FKS FACILITY, toute reproduction, représentation, adaptation, modification partielle ou intégrale de tout élément composant le site, par quelque moyen que ce soit, est interdite sous peine de poursuite judiciaire.
              </p>
            </section>

            {/* Données personnelles */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Données personnelles</h2>
              <p className="mb-4">
                Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion de notre relation commerciale.
              </p>
              <p className="mb-4">
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez d'un droit d'accès, de rectification, d'effacement, de portabilité, de limitation et d'opposition au traitement de vos données.
              </p>
              <p className="mb-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">franck.k@fks-facility.com</a> ou par courrier à FKS FACILITY, 15 rue Lucien Sergent, 91300 Massy.
              </p>
              <p className="mb-4">
                Vous pouvez également introduire une réclamation auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">CNIL</a> (www.cnil.fr).
              </p>
              <p>
                Pour plus d'informations, consultez notre <Link to="/confidentialite" className="text-primary-600 hover:underline">politique de confidentialité</Link>.
              </p>
            </section>

            {/* Cookies */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="leading-relaxed">
                Notre site utilise des cookies soumis à votre consentement. Pour en savoir plus, consultez notre <Link to="/cookies" className="text-primary-600 hover:underline">politique relative aux cookies</Link>.
              </p>
            </section>

            {/* Liens hypertextes */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Liens hypertextes</h2>
              <p className="mb-4">
                Les liens hypertextes présents sur le site orientant les utilisateurs vers d'autres sites Internet n'engagent pas la responsabilité de FKS FACILITY quant au contenu de ces sites.
              </p>
              <p>
                La création d'un lien pointant vers notre site ne requiert pas d'autorisation. Nous dégageons toute responsabilité dans ce cas.
              </p>
            </section>

            {/* Contact */}
            <section className="pt-8 border-t border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact</h2>
              <p className="font-medium">
                Pour toute question relative aux présentes mentions légales, contactez-nous à : <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">franck.k@fks-facility.com</a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

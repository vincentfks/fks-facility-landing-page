import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const CGV: React.FC = () => {
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
            Conditions Générales de Vente et d'Adhésion
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Applicables à compter du 14 août 2025 — Dernière mise à jour : 15 septembre 2026
          </p>

          <div className="space-y-8 text-gray-600">
            {/* Article 1 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 1 – Objet de l'adhésion</h2>
              <p className="leading-relaxed">
                La société FKS FACILITY, société à responsabilité limitée au capital social de 5 000 €, immatriculée au RCS de Evry sous le numéro 910 470 988 et dont le siège social est situé 15 rue Lucien Sergent – 91300 Massy (ci-après « FKS FACILITY ») a mis en place un système de mutualisation des achats à destination des professionnels. L'adhésion auprès de FKS FACILITY offre à l'adhérent la possibilité de bénéficier de tarifs négociés par FKS FACILITY, auprès de fournisseurs sélectionnés, sur un ensemble de produits et services.
              </p>
            </section>

            {/* Article 2 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 2 – Champ d'application</h2>
              <p className="leading-relaxed mb-4">
                Les présentes conditions générales de vente et d'adhésion (ci-après les « CGVA ») s'appliquent de plein droit, sans restriction ni réserve, à tous les professionnels souhaitant adhérer à FKS FACILITY (ci-après « l'adhérent ») et régissent l'ensemble des relations entre FKS FACILITY et chacun de ses adhérents.
              </p>
              <p className="leading-relaxed mb-4">
                Par son adhésion, l'adhérent reconnaît avoir pris connaissance et avoir accepté, expressément et sans réserve, les clauses et conditions des présentes CGVA.
              </p>
              <p className="leading-relaxed">
                FKS FACILITY se réserve la possibilité de modifier les présentes CGVA à tout moment, sans préavis. Les CGVA applicables sont celles en vigueur au jour de l'adhésion.
              </p>
            </section>

            {/* Article 3 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 3 – Droits et obligations de FKS FACILITY</h2>
              <p className="leading-relaxed mb-4">
                FKS FACILITY s'engage à négocier des tarifs préférentiels sur les produits et services proposés auprès de fournisseurs sélectionnés, afin d'en faire bénéficier ses adhérents.
              </p>
              <p className="leading-relaxed mb-4">
                FKS FACILITY se réserve le droit de faire entrer de nouveaux fournisseurs ou de déréférencer un fournisseur en cours d'année. Chaque modification sera portée à la connaissance de l'adhérent.
              </p>
              <p className="leading-relaxed">
                FKS FACILITY s'engage à conserver la plus stricte confidentialité sur l'identité de ses adhérents.
              </p>
            </section>

            {/* Article 4 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 4 – Droits et obligations des adhérents</h2>
              <p className="leading-relaxed mb-4">
                L'adhérent n'a aucune obligation d'achat vis-à-vis des fournisseurs partenaires et conserve une liberté totale dans le choix de ses fournisseurs. L'adhérent s'engage à :
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Ne procéder à des achats que pour ses besoins professionnels propres, sans possibilité de revente ;</li>
                <li>Ne pas divulguer les conditions négociées à des tiers ;</li>
                <li>Régler à bonne date les sommes dues à FKS FACILITY au titre de l'adhésion ;</li>
                <li>Régler à bonne date les sommes dues aux fournisseurs référencés.</li>
              </ul>
            </section>

            {/* Article 5 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 5 – Adhésion</h2>

              <h3 className="font-semibold text-gray-800 mb-2 mt-4">5.1 Modalités</h3>
              <p className="leading-relaxed mb-4">
                L'adhésion est prise en compte après l'encaissement de la cotisation annuelle. Une fois enregistré, l'adhérent pourra accéder aux conditions négociées par FKS FACILITY.
              </p>

              <h3 className="font-semibold text-gray-800 mb-2 mt-4">5.2 Tarification</h3>
              <p className="leading-relaxed mb-4">
                Le montant de l'adhésion annuelle s'établit en fonction de l'effectif de l'entreprise ou de l'offre promotionnelle en cours. Les tarifs sont affichés en euros (EUR) hors taxes sur la page Tarifs du site.
              </p>

              <h3 className="font-semibold text-gray-800 mb-2 mt-4">5.3 Durée et renouvellement</h3>
              <p className="leading-relaxed mb-4">
                L'adhésion est annuelle. Elle prend effet à la date de la facture et s'achève à date anniversaire. L'adhésion est reconduite par tacite reconduction sauf dénonciation adressée à FKS FACILITY au plus tard 30 jours avant la date anniversaire.
              </p>

              <h3 className="font-semibold text-gray-800 mb-2 mt-4">5.4 Pénalités de retard et frais de recouvrement</h3>
              <p className="leading-relaxed mb-4">
                En cas de retard de paiement, une indemnité forfaitaire pour frais de recouvrement de 40 € sera appliquée conformément à l'article D. 441-5 du Code de commerce. Le montant des pénalités de retard résulte de l'application, aux sommes restant dues, du taux d'intérêt légal en vigueur au moment de l'incident.
              </p>
              <p className="leading-relaxed">
                Les pénalités sont exigibles sans qu'un rappel soit nécessaire et courent dès le jour suivant la date de règlement portée sur la facture. Elles sont appliquées sur le montant TTC et ne sont pas soumises à TVA.
              </p>
            </section>

            {/* Article 6 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 6 – Résiliation</h2>
              <p className="leading-relaxed mb-4">
                Le contrat d'adhésion pourra être résilié avant son échéance, sans indemnité, en cas de manquement par l'adhérent à ses obligations. La cotisation reste acquise par FKS FACILITY. La résiliation anticipée entraîne la suspension sans délai de l'accès de l'adhérent aux services FKS FACILITY.
              </p>
              <p className="leading-relaxed">
                Pour résilier, l'adhérent doit adresser sa demande par email à <a href="mailto:franck.k@fks-facility.com" className="text-primary-600 hover:underline">franck.k@fks-facility.com</a> ou par courrier recommandé au siège social de FKS FACILITY.
              </p>
            </section>

            {/* Article 7 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 7 – Responsabilités</h2>
              <p className="leading-relaxed">
                FKS FACILITY n'est pas responsable des relations entre les adhérents et les fournisseurs au niveau de la passation, du suivi des commandes, des délais et modalités de livraison, ainsi que du règlement. L'adhérent est pleinement responsable de son choix et assume toutes les conséquences du contrat établi directement avec le fournisseur.
              </p>
            </section>

            {/* Article 8 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 8 – Paiement et facturation</h2>

              <h3 className="font-semibold text-gray-800 mb-2 mt-4">8.1 Monnaie de facturation</h3>
              <p className="leading-relaxed mb-4">
                L'ensemble des prix et factures sont libellés en euros (EUR). Aucun frais de conversion de devise n'est appliqué.
              </p>

              <h3 className="font-semibold text-gray-800 mb-2 mt-4">8.2 Prestataire de paiement</h3>
              <p className="leading-relaxed mb-4">
                Les paiements par carte bancaire sont traités par Stripe Technology Europe Limited (1 Grand Canal Street Lower, Grand Canal Dock, Dublin 2, Irlande). Stripe est certifié PCI DSS Level 1. FKS FACILITY ne stocke, ne collecte ni ne traite directement aucune donnée bancaire. Pour plus d'informations sur la sécurité des paiements : <a href="https://stripe.com/fr/legal/privacy-center" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">stripe.com/fr/legal/privacy-center</a>.
              </p>

              <h3 className="font-semibold text-gray-800 mb-2 mt-4">8.3 Moyens de paiement acceptés</h3>
              <p className="leading-relaxed">
                Carte bancaire (Visa, Mastercard, American Express) via Stripe Checkout sécurisé. Virement bancaire sur demande.
              </p>
            </section>

            {/* Article 9 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 9 – Protection des données personnelles</h2>
              <p className="leading-relaxed">
                FKS FACILITY assure la protection des données personnelles de ses adhérents conformément au Règlement Européen 2016/679 (RGPD) et à la loi Informatique et Libertés du 6 janvier 1978. Pour plus d'informations, consultez notre <Link to="/confidentialite" className="text-primary-600 hover:underline">politique de confidentialité</Link>.
              </p>
            </section>

            {/* Article 10 */}
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Article 10 – Droit applicable et juridiction</h2>
              <p className="leading-relaxed">
                Les présentes CGVA sont régies par le droit français. Tous les différends nés ou à naître découlant de leur application seront portés devant le Tribunal de Commerce d'Evry (France).
              </p>
            </section>

            {/* Dernière mise à jour */}
            <section className="pt-8 border-t border-gray-100">
              <p className="text-sm text-gray-400 text-right">Dernière mise à jour : 15/09/2026</p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

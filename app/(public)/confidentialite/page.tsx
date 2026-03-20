export default function ConfidentialitePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-amber-950 mb-8">Politique de confidentialité</h1>
      <div className="prose prose-amber max-w-none text-amber-800 space-y-6">
        <p>
          Ce site ne collecte pas de données personnelles à des fins commerciales. Les informations que vous nous transmettez (email, téléphone) via les liens de contact sont utilisées uniquement pour répondre à vos demandes.
        </p>
        <p>
          Les données éventuellement collectées par les outils d’analyse (anonymisées) servent à améliorer le site. Aucune donnée n’est cédée à des tiers.
        </p>
        <p>
          Conformément au RGPD, vous disposez d’un droit d’accès, de rectification et de suppression de vos données. Pour toute demande : contactez-nous via les coordonnées indiquées sur la page Contact.
        </p>
      </div>
    </div>
  );
}

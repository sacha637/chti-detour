export default function AllergenesPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-amber-950 mb-8">Allergènes</h1>
      <div className="prose prose-amber max-w-none text-amber-800 space-y-6">
        <p>
          Conformément à la réglementation, les allergènes majeurs sont indiqués sur notre menu ou communiqués par notre équipe sur demande.
        </p>
        <p>
          Les 14 allergènes à déclaration obligatoire : gluten, crustacés, œufs, poissons, arachides, soja, lait, fruits à coque, céleri, moutarde, graines de sésame, anhydride sulfureux et sulfites, lupin, mollusques.
        </p>
        <p>
          En cas d’allergie ou d’intolérance, n’hésitez pas à nous en informer au moment de la commande ou de la réservation.
        </p>
      </div>
    </div>
  );
}

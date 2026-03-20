export default function Home() {
  return (
    <main className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Ch'ti Détour</h1>
      <p className="mb-6">Bienvenue dans votre friterie du Nord</p>

      <div className="flex gap-4 justify-center">
        <a href="/menu" className="bg-orange-500 text-white px-4 py-2 rounded">
          Voir le menu
        </a>
        <a href="/contact" className="border px-4 py-2 rounded">
          Nous contacter
        </a>
      </div>
    </main>
  );
}

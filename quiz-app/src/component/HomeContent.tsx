type HomeContentType = 
{
    titre: string;
}
export default function HomeContent({titre}:HomeContentType)
{
    return (
        <main className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg w-full max-w-md md:max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">
            {titre}🎮
          </h2>
          <p className="text-gray-700 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae
            scelerisque enim ligula venenatis dolor.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 w-full md:w-auto transition">
            Commencer le Quiz
          </button>
        </div>
      </main>
    )
}
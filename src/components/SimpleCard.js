// components/SimpleCard.js

export default function SimpleCard() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h5 className="text-center text-2xl font-semibold text-gray-800 mb-4">
              Bienvenue sur mon site !
            </h5>
            <p className="text-center text-gray-600 mb-6">
              Ce composant est simple et léger, sans Material Tailwind.
            </p>
            <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Découvrir Plus
            </button>
          </div>
        </div>
      </div>
    );
  }
  
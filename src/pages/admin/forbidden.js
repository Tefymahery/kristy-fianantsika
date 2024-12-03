// src/pages/admin/forbidden.js
import Link from 'next/link';

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">403</h1>
        <p className="text-xl text-gray-800">Accès refusé</p>
        <Link href="/admin"  className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Retour à page de connexion
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;

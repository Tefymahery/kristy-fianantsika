// pages/404.js
import React from 'react';
import  Navbar  from '../components/Navbar';  // Assure-toi d'importer ta Navbar
import  Footer  from '../components/Footer';  // Assure-toi d'importer ton Footer
import Link from 'next/link';  // Utilise Next.js Link pour la navigation interne
import ToHome from '@/components/IconButtonHome';

export default function NotFoundPage() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
      
      <Navbar /> 
       {/* Inclure la Navbar 
      
     
      */}
      
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center mt-4">
          <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
            404 - Page Not Found
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
            Oups! Il semble que la page que vous recherchez n'existe pas.
          </p>
          <div className="mt-6">
            <ToHome />
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Ou, vous pouvez <Link href="/contact" className="text-blue-600 hover:text-blue-500">
  Nous contacter
</Link> si vous avez besoin d'aide.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />  {/* Inclure le Footer */}
    </div>
  );
}
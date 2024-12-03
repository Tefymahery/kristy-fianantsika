import React from "react";
import Link from "next/link"; // Import du composant Link de Next.js
import { Button } from "@material-tailwind/react";
import { HomeIcon } from "@heroicons/react/24/outline"; // Icône de Heroicons

const IconButtonHome = ({ href = "/", className = "" }) => {
  return (
    <Link href={href}>
      
        <Button
          variant="outlined" // Style du bouton
          color="blue" // Couleur principale
          className={`flex items-center gap-2 ${className}`} // Classes supplémentaires
        >
          <HomeIcon className="h-5 w-5" /> {/* Icône maison */}
          Home {/* Texte du bouton */}
        </Button>
      
    </Link>
  );
};

export default IconButtonHome;

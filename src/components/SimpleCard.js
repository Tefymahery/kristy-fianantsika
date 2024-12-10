// components/SimpleCard.js
import { Card, Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function SimpleCard() {
  const [isClient, setIsClient] = useState(false);

  // Le useEffect s'exécute une seule fois après le premier rendu côté client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true); // Le composant est rendu côté client
    }
  }, []); // Pas de dépendances, donc s'exécute une seule fois

  // Retourner null si ce n'est pas côté client (éviter le rendu côté serveur)
  if (!isClient) {
    return null; // Empêche le rendu côté serveur
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg rounded-lg">
        <div className="p-6">
          <Typography variant="h5" className="text-center mb-4">
            Bienvenue sur mon site be !
          </Typography>
          <Typography className="text-center mb-6">
            Ce composant est créé avec Material Tailwind. Il est simple et léger.
          </Typography>
          <Button variant="gradient" color="blue" fullWidth>
            Découvrir Plus
          </Button>
        </div>
      </Card>
    </div>
  );
}

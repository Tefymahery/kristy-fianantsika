// components/SimpleCard.js
import { Card, Button, Typography } from "@material-tailwind/react";

import { useEffect, useState } from "react";

export default function SimpleCard() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Le composant est rendu après le montage
  }, []);

  if (!isClient) {
    return null; // Ne pas rendre le composant côté serveur
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-lg rounded-lg">
        <div className="p-6">
          <Typography variant="h5" className="text-center mb-4">
            Bienvenue sur mon site !
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

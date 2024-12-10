// components/SimpleCard.js
import { Card, Button, Typography } from "@material-tailwind/react";

export default function SimpleCard() {
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

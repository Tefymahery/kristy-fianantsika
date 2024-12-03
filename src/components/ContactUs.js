import React from "react";
import {
  Input,
  Textarea,
  Button,
  Checkbox,
  Typography,
} from "@material-tailwind/react";

export default function ContactUs() {
  return (
    <div className="flex flex-col md:flex-row items-start justify-between gap-8 p-8 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-lg mt-4">
      {/* Section Formulaire */}
      <div className="flex-1">
        <Typography
          variant="h4"
          className="mb-4 text-gray-900 dark:text-gray-100"
        >
          Contact us
        </Typography>
        <form className="space-y-4">
          {/* Champs Nom et Prénom */}
          <div className="flex gap-4">
            <Input
              label="First Name"
              size="md"
              className="w-full dark:text-gray-100"
            />
            <Input
              label="Last Name"
              size="md"
              className="w-full dark:text-gray-100"
            />
          </div>
          {/* Champ Numéro de Téléphone */}
          <Input
            label="Phone Number"
            size="md"
            className="w-full dark:text-gray-100"
          />
          {/* Champ Message */}
          <Textarea
            label="Message"
            size="md"
            className="w-full dark:text-gray-100"
          />
          {/* Checkbox et Politique de Confidentialité */}
          <div className="flex items-start gap-2">
            <Checkbox
              label={
                <Typography
                  className="flex font-medium text-gray-900 dark:text-gray-200"
                >
                  I agree with the
                  <Typography
                    as="a"
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-400 ml-1"
                  >
                    terms and conditions
                  </Typography>
                  .
                </Typography>
              }
            />
          </div>
          {/* Bouton d'envoi */}
          <Button color="blue-gray" className="w-full dark:bg-blue-700">
            SEND MESSAGE
          </Button>
        </form>
      </div>

      {/* Section Informations */}
      <div className="flex-1">
        <Typography
          variant="h4"
          className="mb-4 text-gray-900 dark:text-gray-100"
        >
          Get in Touch
        </Typography>
        <Typography
          className="text-gray-600 dark:text-gray-300 mb-6"
          variant="small"
        >
          You need more information? Check what other persons are saying about
          our product. They are very happy with their purchase.
        </Typography>
        <ul className="space-y-4 text-gray-600 dark:text-gray-300">
          <li className="flex items-center gap-4">
            <span className="text-black dark:text-white font-medium">📞</span>
            <Typography>+1 (424) 535 3523</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-black dark:text-white font-medium">✉️</span>
            <Typography>hello@mail.com</Typography>
          </li>
          <li className="flex items-center gap-4">
            <span className="text-black dark:text-white font-medium">🛠️</span>
            <Typography>Open Support Ticket</Typography>
          </li>
        </ul>
      </div>
    </div>
  );
}

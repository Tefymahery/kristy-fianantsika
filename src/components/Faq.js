import React from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import faqData from "../data/faqData"; // Importer les données

export default function AccordionCustomStyles() {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {faqData
        .filter((faq) => faq.active) // Ne garder que les questions activées
        .map((faq) => (
          <Accordion
            key={faq._id}
            open={open === faq._id}
            className="mb-2 rounded-lg border border-gray-300 dark:border-gray-600"
          >
            <AccordionHeader
              onClick={() => handleOpen(faq._id)}
              className={`p-2 border-b-0 transition-colors text-gray-900 dark:text-gray-200 ${
                open === faq._id
                  ? "text-blue-500 dark:text-blue-400 hover:!text-blue-700 dark:hover:!text-blue-300"
                  : "hover:text-blue-500 dark:hover:text-blue-400"
              }`}
            >
              {faq.question}
            </AccordionHeader>
            <AccordionBody className="pt-0 p-2 text-left text-gray-700 dark:text-gray-300">
              {faq.answer}
            </AccordionBody>
          </Accordion>
        ))}
    </div>
  );
}

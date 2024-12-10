import { Button, Card, Typography } from "@material-tailwind/react";
//import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUs from "@/components/ContactUs";
import RootCategories from "@/components/RootCartegories";
import CarouselB from "../components/Carousel";
import dynamic from "next/dynamic";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";

// Charger Faq dynamiquement
//const Faq = dynamic(() => import("../components/Faq"), { ssr: false });

export default function Home() {
  //const [articles, setArticles] = useState([]);
  //const [isLoading, setIsLoading] = useState(false);

  //const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/articles`;

  
  //useEffect(() => {
    //setIsLoading(true);
    //axios
      //.get(API_URL)
      //.then((response) => setArticles(response.data))
      //.catch((error) => console.error(error))
      //.finally(() => setIsLoading(false));
  //}, [API_URL]); 

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar 
      <Navbar />
      */}
      

      {/* Categories
        <RootCategories />
      */}
      

      {/* Main content 
      <div className="flex flex-1 flex-col items-center text-center py-16 px-4 sm:px-8 md:px-12">
        <h1 className="text-4xl md:text-6xl text-red-500 font-extrabold mb-6 dark:text-white">
          Liste des Articles
        </h1>
        <CarouselB />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {isLoading ? (
            <Typography className="text-center text-gray-500">
              Chargement des articles...
            </Typography>
          ) : articles.length ? (
            articles.map((article) => (
              <Card
                key={article._id}
                className="p-4 shadow-lg border hover:shadow-xl transition"
              >
                <Typography variant="h5" className="mb-2 text-gray-800 dark:text-gray-200">
                  {article.title}
                </Typography>
                <Typography className="text-gray-600 dark:text-gray-400 mb-4">
                  {article.excerpt}
                </Typography>
                <Link href={`/articles/${article._id}`}>
                  <Button variant="gradient" color="blue" ripple={true}>
                    Lire Plus
                  </Button>
                </Link>
              </Card>
            ))
          ) : (
            <Typography className="text-center text-gray-500">
              Aucun article trouvé.
            </Typography>
          )}
        </div>

        <div className="mt-16">
          <Faq />
        </div>
        <Button
          color="light-blue"
          ripple={true}
          className="text-white bg-light-blue-500 hover:bg-light-blue-600 px-6 py-3 rounded-lg shadow-md transition-all duration-200 mt-8"
        >
          Découvrir Plus
        </Button>
        <div id="contact-us" className="mt-16">
          <ContactUs />
        </div>
      </div>
      */}
      {/* Footer */}
      <Footer />
    </div>
  );
}

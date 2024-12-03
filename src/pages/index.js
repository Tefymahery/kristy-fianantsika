import { Button, Card } from "@material-tailwind/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactUs from "@/components/ContactUs";
//import CardB from "../components/Card";
import CarouselB from "../components/Carousel";
import dynamic from "next/dynamic";
import Badge from "../components/Badge";

// Charger Faq dynamiquement
const Faq = dynamic(() => import("../components/Faq"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center items-center text-center py-16 px-4 sm:px-8 md:px-12">
        <h1 className="text-4xl md:text-6xl text-red-500 font-extrabold mb-6 dark:text-white">
          Welcome to My Site
        </h1>
        <span>
          <Badge />
        </span>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          A place for amazing content, inspiration, and community.
        </p>

        <CarouselB />

        <div>
          <Faq />
        </div>
        <div>
        </div>
        <Button
          color="light-blue"
          ripple={true}
          className="text-white bg-light-blue-500 hover:bg-light-blue-600 px-6 py-3 rounded-lg shadow-md transition-all duration-200"
        >
          Get Started
        </Button>
        <div id="contact-us"></div>
          <ContactUs/>
        
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Card, Typography } from "@material-tailwind/react";

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/articles`;

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      axios
        .get(`${API_URL}/${id}`)
        .then((response) => setArticle(response.data))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Typography className="text-gray-500">Chargement...</Typography>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Typography className="text-gray-500">
          Article introuvable ou ID incorrect.
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      {/* Navbar */}
      <Navbar />

      {/* Article content */}
      <div className="flex flex-col items-center py-16 px-4 sm:px-8 md:px-12">
        <Card className="w-full max-w-4xl p-6 shadow-lg border">
          <Typography variant="h3" className="mb-4 text-gray-800 dark:text-gray-200">
            {article.title}
          </Typography>
          <Typography variant="h6" className="mb-6 text-gray-600 dark:text-gray-400">
            {article.subtitle}
          </Typography>
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-auto mb-6 rounded-lg"
          />
          <Typography className="mb-8 text-gray-700 dark:text-gray-300">
            {article.excerpt}
          </Typography>

          {/* Render dynamic content */}
          <div className="space-y-6">
            {article.content.map((item) => {
              if (item.type === "text") {
                return (
                  <Typography
                    key={item._id}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {item.content}
                  </Typography>
                );
              }
              if (item.type === "image") {
                return (
                  <img
                    key={item._id}
                    src={item.src}
                    alt={`Image for ${article.title}`}
                    className="w-full h-auto rounded-lg"
                  />
                );
              }
              return null;
            })}
          </div>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// components/RootCategories.js
import React, { useState, useEffect } from "react";

const RootCategories = () => {
  const [categories, setCategories] = useState([]);  // État pour stocker les catégories
  const [loading, setLoading] = useState(true);       // État pour gérer le chargement
  const [error, setError] = useState(null);           // État pour gérer les erreurs

  useEffect(() => {
    // Fonction pour récupérer les catégories depuis l'API
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories/root-categories");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const data = await response.json();
        setCategories(data);  // Mettre à jour les catégories dans l'état
      } catch (err) {
        setError(err.message);  // Gérer les erreurs
      } finally {
        setLoading(false);  // Changer l'état du chargement
      }
    };

    fetchCategories();  // Appeler la fonction pour récupérer les catégories
  }, []);  // Le tableau vide [] garantit que la requête est lancée une seule fois au montage du composant

  if (loading) return <div>Loading...</div>;  // Affichage pendant le chargement
  if (error) return <div>Error: {error}</div>;  // Affichage en cas d'erreur

  return (
    <div>
     
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <h3>{category.title}</h3>
            <p>{category.description}</p>
            <p>Articles: {category.articleCount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RootCategories;

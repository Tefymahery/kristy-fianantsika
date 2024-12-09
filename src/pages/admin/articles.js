import { useState, useEffect } from "react";
import withAdminAuth from "@/components/admin/withAdminAuth";
import NavbarAdmin from "@/components/admin/NavbarAdmin";
import FooterAdmin from "@/components/admin/FooterAdmin";
import axios from "axios";
import {
  Button,
  Input,
  Textarea,
  Select,
  Option,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { FaPlus, FaPen, FaTrash } from "react-icons/fa";

const AdminArticles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(""); // Définit l'état pour gérer les erreurs
  const [newArticle, setNewArticle] = useState({
    title: "",
    subtitle: "",
    excerpt: "",
    author: "",
    category: "",
    content: [],
    tags: [],
    isPublished: false,
  });
  const [editArticle, setEditArticle] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/articles`;

  useEffect(() => {
    axios.get(API_URL).then((response) => setArticles(response.data));
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((response) => setCategories(response.data));
  }, []);

  const handleCreateArticle = () => {
    setIsLoading(true);
    axios
      .post(API_URL, newArticle)
      .then((response) => {
        setArticles([...articles, response.data]);
        setNewArticle({
          title: "",
          subtitle: "",
          excerpt: "",
          author: "",
          category: "",
          content: [],
          tags: [],
          isPublished: false,
        });
        setShowDialog(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleUpdateArticle = (id) => {
    setIsLoading(true);
    axios
      .put(`${API_URL}/${id}`, editArticle)
      .then((response) => {
        const updatedArticles = articles.map((article) =>
          article._id === id ? response.data : article
        );
        setArticles(updatedArticles);
        setEditArticle(null);
        setShowDialog(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const handleDeleteArticle = () => {
    axios
      .delete(`${API_URL}/${articleToDelete}`)
      .then(() => {
        setArticles(articles.filter((article) => article._id !== articleToDelete));
        setArticleToDelete(null);
        setShowConfirmDialog(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 mt-4">
      <NavbarAdmin />
      <div className="p-8 space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-800 p-6 rounded-t-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold dark:text-white">Gestion des Articles</h3>
              <Button
                color="blue"
                onClick={() => {
                  setShowDialog(true);
                  setEditArticle(null);
                }}
              >
                <FaPlus /> Ajouter un Article
              </Button>
            </div>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <div key={article._id} className="p-4 border rounded">
                  <Typography variant="h6">{article.title}</Typography>
                  <Typography>{article.subtitle}</Typography>
                  <div className="flex justify-between mt-4">
                    <Button
                      onClick={() => {
                        setEditArticle(article);
                        setShowDialog(true);
                      }}
                      color="yellow"
                    >
                      <FaPen />
                    </Button>
                    <Button
                      onClick={() => {
                        setArticleToDelete(article._id);
                        setShowConfirmDialog(true);
                      }}
                      color="red"
                    >
                      <FaTrash />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Dialog de création/modification d'article */}
      <Dialog open={showDialog} handler={setShowDialog}>
  <DialogHeader>
    {editArticle ? "Modifier l'Article" : "Créer un Nouvel Article"}
  </DialogHeader>
  <DialogBody className="space-y-4 max-h-[80vh] overflow-y-auto">
    {/* Titre */}
    <Input
      label="Titre"
      value={editArticle ? editArticle.title : newArticle.title}
      onChange={(e) =>
        editArticle
          ? setEditArticle({ ...editArticle, title: e.target.value })
          : setNewArticle({ ...newArticle, title: e.target.value })
      }
      required
    />
    
    {/* Sous-titre */}
    <Input
      label="Sous-titre"
      value={editArticle ? editArticle.subtitle : newArticle.subtitle}
      onChange={(e) =>
        editArticle
          ? setEditArticle({ ...editArticle, subtitle: e.target.value })
          : setNewArticle({ ...newArticle, subtitle: e.target.value })
      }
    />

    {/* Extrait */}
    <Textarea
      label="Extrait"
      value={editArticle ? editArticle.excerpt : newArticle.excerpt}
      onChange={(e) =>
        editArticle
          ? setEditArticle({ ...editArticle, excerpt: e.target.value })
          : setNewArticle({ ...newArticle, excerpt: e.target.value })
      }
    />

    {/* Auteur */}
    <Input
      label="Auteur"
      value={editArticle ? editArticle.author : newArticle.author}
      onChange={(e) =>
        editArticle
          ? setEditArticle({ ...editArticle, author: e.target.value })
          : setNewArticle({ ...newArticle, author: e.target.value })
      }
    />

    {/* Catégorie */}
    <Select
      label="Catégorie"
      value={editArticle ? editArticle.category : newArticle.category}
      onChange={(value) =>
        editArticle
          ? setEditArticle({ ...editArticle, category: value })
          : setNewArticle({ ...newArticle, category: value })
      }
    >
      {categories.map((category) => (
        <Option key={category._id} value={category._id}>
          {category.name}
        </Option>
      ))}
    </Select>

    {/* Contenu (ajout de texte ou d'image) */}
      
      <div className="mt-4">
        <Typography variant="small">Contenu</Typography>
        <Button
          className="mt-2"
          onClick={() =>
            editArticle
              ? setEditArticle({
                  ...editArticle,
                  content: [...editArticle.content, { type: "text", content: "" }],
                })
              : setNewArticle({
                  ...newArticle,
                  content: [...newArticle.content, { type: "text", content: "" }],
                })
          }
        >
          Ajouter du texte
        </Button>
        <Button
          className="mt-2 ml-2"
          onClick={() =>
            editArticle
              ? setEditArticle({
                  ...editArticle,
                  content: [...editArticle.content, { type: "image", src: "" }],
                })
              : setNewArticle({
                  ...newArticle,
                  content: [...newArticle.content, { type: "image", src: "" }],
                })
          }
        >
          Ajouter une image
        </Button>

        {(editArticle ? editArticle.content : newArticle.content).map((item, index) => (
          <div key={index} className="mt-2">
            {item.type === "text" && (
              <Textarea
                label={`Texte ${index + 1}`}
                value={item.content}
                onChange={(e) => {
                  const updatedContent = (editArticle
                    ? [...editArticle.content]
                    : [...newArticle.content]
                  ).map((contentItem, i) =>
                    i === index ? { ...contentItem, content: e.target.value } : contentItem
                  );
                  editArticle
                    ? setEditArticle({ ...editArticle, content: updatedContent })
                    : setNewArticle({ ...newArticle, content: updatedContent });
                }}
              />
            )}
            {item.type === "image" && (
              <Input
                label={`URL de l'image ${index + 1}`}
                value={item.src}
                onChange={(e) => {
                  const updatedContent = (editArticle
                    ? [...editArticle.content]
                    : [...newArticle.content]
                  ).map((contentItem, i) =>
                    i === index ? { ...contentItem, src: e.target.value } : contentItem
                  );
                  editArticle
                    ? setEditArticle({ ...editArticle, content: updatedContent })
                    : setNewArticle({ ...newArticle, content: updatedContent });
                }}
              />
            )}
          </div>
        ))}
      </div>

    {/* Tags */}
    <Input
      label="Tags (appuyez sur Entrée pour ajouter)"
      onKeyDown={(e) => {
        if (e.key === "Enter" && e.target.value.trim()) {
          const newTag = e.target.value.trim();
          const updatedTags = editArticle
            ? [...editArticle.tags, newTag]
            : [...newArticle.tags, newTag];
          editArticle
            ? setEditArticle({ ...editArticle, tags: updatedTags })
            : setNewArticle({ ...newArticle, tags: updatedTags });
          e.target.value = "";
        }
      }}
    />
    <div className="mt-2">
      {(editArticle ? editArticle.tags : newArticle.tags).map((tag, index) => (
        <span
          key={index}
          className="bg-blue-500 text-white rounded px-2 py-1 mr-2 inline-block"
        >
          {tag}
          <button
            onClick={() => {
              const updatedTags = (editArticle
                ? [...editArticle.tags]
                : [...newArticle.tags]
              ).filter((_, i) => i !== index);
              editArticle
                ? setEditArticle({ ...editArticle, tags: updatedTags })
                : setNewArticle({ ...newArticle, tags: updatedTags });
            }}
            className="ml-2 text-red-700 font-bold"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  </DialogBody>
  <DialogFooter>
    <Button
      color="red"
      onClick={() => {
        setShowDialog(false);
        setError("");
      }}
    >
      Annuler
    </Button>
    <Button
      color="green"
      disabled={isLoading}
      onClick={
        editArticle
          ? () => handleUpdateArticle(editArticle._id)
          : handleCreateArticle
      }
    >
      {isLoading ? "Chargement..." : editArticle ? "Mettre à jour" : "Créer"}
    </Button>
  </DialogFooter>
</Dialog>


      {/* Dialog de confirmation pour suppression */}
      <Dialog open={showConfirmDialog} handler={setShowConfirmDialog}>
        <DialogHeader>Confirmer la suppression</DialogHeader>
        <DialogBody>
          Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.
        </DialogBody>
        <DialogFooter>
          <Button color="gray" onClick={() => {
            setShowConfirmDialog(false);
            setError(""); // Réinitialisation de l'erreur
            }
          }>
            Annuler
          </Button>
          <Button color="red" onClick={handleDeleteArticle}>
            Supprimer
          </Button>
        </DialogFooter>
      </Dialog>

      <FooterAdmin />
    </div>
  );
};

export default withAdminAuth(AdminArticles, ["admin", "editor"]);

import { useState, useEffect } from 'react';
import withAdminAuth from '@/components/admin/withAdminAuth';
import NavbarAdmin from '@/components/admin/NavbarAdmin';
import FooterAdmin from '@/components/admin/FooterAdmin';
import axios from 'axios';
import {
  Button,
  Input,
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    parentCategory: null,
    articleCount: 0,
    isActive: true
  });
  const [editCategory, setEditCategory] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  // State pour la confirmation de suppression de toutes les catégories
  const [showClearDialog, setShowClearDialog] = useState(false);

  const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/categories`;

  useEffect(() => {
    axios.get(API_URL)
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleCreateCategory = () => {
    axios.post(API_URL, newCategory)
      .then(response => {
        setCategories([...categories, response.data]);
        setNewCategory({ name: '', description: '', parentCategory: null, articleCount: 0, isActive: true });
        setShowDialog(false);
      })
      .catch(error => console.error(error));
  };

  const handleUpdateCategory = (id) => {
    axios.put(`${API_URL}/${id}`, editCategory)
      .then(response => {
        const updatedCategories = categories.map(category => category._id === id ? response.data : category);
        setCategories(updatedCategories);
        setEditCategory(null);
        setShowDialog(false);
      })
      .catch(error => console.error(error));
  };

 const handleDeleteCategory = () => {
  axios.delete(`${API_URL}/${categoryToDelete}`)
    .then(() => {
      setCategories(categories.filter(category => category._id !== categoryToDelete));
      setShowDeleteDialog(false);
      // Optionnel: Afficher un message de succès ou d'erreur selon le cas
      alert('La catégorie et ses sous-catégories ont été supprimées avec succès');
    })
    .catch(error => {
      console.error(error);
      alert('Erreur lors de la suppression de la catégorie');
    });
};

    // Fonction pour supprimer toutes les catégories
    const handleClearCategories = () => {
      axios.delete(`${API_URL}/all`)
        .then(() => {
          setCategories([]); // Vider la liste des catégories côté frontend
          setShowClearDialog(false);
          alert('Toutes les catégories ont été supprimées avec succès');
        })
        .catch(error => {
          console.error(error);
          alert('Erreur lors de la suppression de toutes les catégories');
        });
    };

  // Fonction récursive pour afficher les catégories avec leur hiérarchie
  const renderCategoryTree = (parentId = null, depth = 0) => {
    return categories
      .filter(category => category.parentCategory === parentId)
      .map(category => (
        <div key={category._id} className={`ml-${depth * 4} mb-2`}>
          <Typography variant="h6" className="text-gray-700 font-semibold">{category.name}</Typography>
          <div className="flex justify-between items-center">
            <Button
              size="sm"
              color="yellow"
              onClick={() => {
                setEditCategory(category);
                setShowDialog(true);
              }}
            >
              Modifier
            </Button>
            <Button
              size="sm"
              color="red"
              onClick={() => {
                setCategoryToDelete(category._id);
                setShowDeleteDialog(true);
              }}
            >
              Supprimer
            </Button>
          </div>
          {/* Appel récursif pour les sous-catégories */}
          {renderCategoryTree(category._id, depth + 1)}
        </div>
      ));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarAdmin />
      <div className="flex flex-1 flex-col p-4">
        <Typography variant="h4" color="blue-gray" className="mb-4">
          Gestion des Catégories
        </Typography>

        {/* Bouton pour créer une nouvelle catégorie */}
        <Button color="blue" onClick={() => { setShowDialog(true); setEditCategory(null); }} className="mb-4">
          Créer une catégorie
        </Button>

         {/* Bouton pour vider la base de données des catégories */}
        <Button color="red" onClick={() => setShowClearDialog(true)} className="mb-4">
          Vider toutes les catégories
        </Button>

        {/* Liste des catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderCategoryTree()}
        </div>

        {/* Dialog de confirmation de suppression de toutes les catégories */}
        <Dialog open={showClearDialog} handler={setShowClearDialog}>
        <DialogHeader>Confirmation</DialogHeader>
        <DialogBody>
          Êtes-vous sûr de vouloir supprimer toutes les catégories ? Cette action est irréversible.
        </DialogBody>
        <DialogFooter className="space-x-4">
          <Button onClick={() => setShowClearDialog(false)} color="red">
            Annuler
          </Button>
          <Button onClick={handleClearCategories} color="green">
            Supprimer toutes
          </Button>
        </DialogFooter>
      </Dialog>



        {/* Dialog pour la création et la modification de catégorie */}
        <Dialog open={showDialog} handler={setShowDialog}>
          <DialogHeader>
            {editCategory ? 'Modifier la catégorie' : 'Créer une nouvelle catégorie'}
          </DialogHeader>
          <DialogBody className="space-y-4">
            <Input
              label="Nom de la catégorie"
              value={editCategory ? editCategory.name : newCategory.name}
              onChange={(e) => editCategory ? setEditCategory({ ...editCategory, name: e.target.value }) : setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <Textarea
              label="Description"
              value={editCategory ? editCategory.description : newCategory.description}
              onChange={(e) => editCategory ? setEditCategory({ ...editCategory, description: e.target.value }) : setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <Input
              label="Nombre d'articles"
              type="number"
              value={editCategory ? editCategory.articleCount : newCategory.articleCount}
              onChange={(e) => editCategory ? setEditCategory({ ...editCategory, articleCount: e.target.value }) : setNewCategory({ ...newCategory, articleCount: e.target.value })}
            />
            <Select
              label="Catégorie parente"
              value={editCategory ? editCategory.parentCategory : newCategory.parentCategory}
              onChange={(value) => editCategory ? setEditCategory({ ...editCategory, parentCategory: value }) : setNewCategory({ ...newCategory, parentCategory: value })}
            >
              <Option value={null}>Aucune</Option>
              {categories.filter(c => c._id !== (editCategory ? editCategory._id : null)).map(category => (
                <Option key={category._id} value={category._id}>{category.name}</Option>
              ))}
            </Select>
            {/* Option pour l'activation/désactivation */}
            <div className="flex items-center">
              <Switch
                checked={editCategory ? editCategory.isActive : newCategory.isActive}
                onChange={(e) => editCategory ? setEditCategory({ ...editCategory, isActive: e.target.checked }) : setNewCategory({ ...newCategory, isActive: e.target.checked })}
              />
              <Typography className="ml-2">Actif</Typography>
            </div>
          </DialogBody>
          <DialogFooter className="space-x-4">
            <Button onClick={() => setShowDialog(false)} color="red">
              Annuler
            </Button>
            <Button onClick={editCategory ? () => handleUpdateCategory(editCategory._id) : handleCreateCategory} color="green">
              {editCategory ? 'Mettre à jour' : 'Ajouter'}
            </Button>
          </DialogFooter>
        </Dialog>

        {/* Dialog de confirmation de suppression */}
        <Dialog open={showDeleteDialog} handler={setShowDeleteDialog}>
          <DialogHeader>Confirmation</DialogHeader>
          <DialogBody>
            Êtes-vous sûr de vouloir supprimer cette catégorie ?
          </DialogBody>
          <DialogFooter className="space-x-4">
            <Button onClick={() => setShowDeleteDialog(false)} color="red">
              Annuler
            </Button>
            <Button onClick={handleDeleteCategory} color="green">
              Supprimer
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <FooterAdmin />
    </div>
  );
};

export default withAdminAuth(AdminCategories, ['admin', 'editor']);

import { useState, useEffect } from 'react';
import withAdminAuth from '@/components/admin/withAdminAuth';
import NavbarAdmin from '@/components/admin/NavbarAdmin';
import FooterAdmin from '@/components/admin/FooterAdmin';
import axios from 'axios';
import { 
  FaTrash, 
  FaUndo, 
  FaPlus,
  FaPen  
} from 'react-icons/fa'; // Utilisation de react-icons pour l'icône

import {
  Button,
  Input,
  IconButton,
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
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


      // Fonction pour réinitialiser la catégorie parente d'une catégorie à null
  const resetParentCategory = (categoryId) => {
    axios.put(`${API_URL}/${categoryId}`, { parentCategory: null })
      .then(response => {
        const updatedCategories = categories.map(category =>
          category._id === categoryId ? response.data : category
        );
        setCategories(updatedCategories);
        setEditCategory(null); // Réinitialiser l'état de modification
        alert('La catégorie parente a été réinitialisée');
      })
      .catch(error => console.error('Erreur lors de la réinitialisation de la catégorie parente:', error));
  };
  

    // Fonction de triage de la categorie
    const sortCategories = (categories) => {
      const sortedCategories = [];
    
      // Fonction pour trier les catégories récursivement
      const addCategory = (parentId = null, depth = 0) => {
        categories
          .filter(category => category.parentCategory === parentId)
          .forEach(category => {
            sortedCategories.push({ ...category, depth });
            addCategory(category._id, depth + 1); // Appel récursif pour ajouter les sous-catégories
          });
      };
    
      addCategory(); // Commencer le tri
      return sortedCategories;
    };
    
    const sortedCategories = sortCategories(categories);


  // Fonction récursive pour afficher les catégories avec leur hiérarchie
  const renderCategoryTree = (parentId = null, depth = 0) => {
    return categories
      .filter(category => category.parentCategory === parentId)
      .map(category => (
        <div key={category._id} className={"ml-${depth * 4} mb-2"}>
          <Typography variant="h6" className="text-gray-700 font-semibold">{category.name}</Typography>
          
          <div className="flex  gap-4 items-end">
            <Tooltip content="Modifier la categorie">
            <IconButton
              size="sm"
              color="yellow"
              onClick={() => {
                setEditCategory(category);
                setShowDialog(true);
              }}
            >
              <FaPen />
              
            </IconButton>
            </Tooltip>
            {/* Bouton pour réinitialiser la catégorie parente */}
               <Tooltip content="Reinitiliser la categorie parente à 'Aucune' ">
                <IconButton
                  color="amber" 
                   size="sm"
                   onClick={() => 
                    resetParentCategory(category._id)
                    }
                   >
                  <FaUndo />
               
                </IconButton>
              </Tooltip>
            <Tooltip content="Supprimer la categorie">
            <IconButton
              size="sm"
              color="red"
              onClick={() => {
                setCategoryToDelete(category._id);
                setShowDeleteDialog(true);
              }}
            >
              <FaTrash />
            </IconButton>
            </Tooltip>
          </div>
          {/* Appel récursif pour les sous-catégories */}
          {renderCategoryTree(category._id, depth + 1)}
        </div>
      ));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 mt-4">
      <NavbarAdmin />

      <div className="p-8 space-y-8">
      <Card className="shadow-lg">

      <CardHeader className="bg-gray-100 dark:bg-gray-800 p-6 rounded-t-md">
        <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold dark:text-white">Gestion des Catégories</h3>
     
        {/* Bouton pour créer une nouvelle catégorie */}
        <Button color="blue" onClick={() => { setShowDialog(true); setEditCategory(null); }} className="mb-4 flex items-center gap-2">
          <FaPlus />Créer une catégorie
        </Button>

         {/* Bouton pour vider la base de données des catégories */}
        <Button color="red" onClick={() => setShowClearDialog(true)} className="mb-4 flex items-center gap-2">
          <FaTrash />Vider toutes les catégories
        </Button>
        </div>
      </CardHeader>
      <CardBody>
        {/* Liste des catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderCategoryTree()}
        </div>
      </CardBody>

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
              color="purple" 
              variant="outlined"
              value={editCategory ? (editCategory.parentCategory || '') : (newCategory.parentCategory || '')} // Force la valeur à '' si parentCategory est null
              onChange={(value) => editCategory ? setEditCategory({ ...editCategory, parentCategory: value }) : setNewCategory({ ...newCategory, parentCategory: value })}
            >
              <Option value={null}>Aucune</Option>
              {sortedCategories
                .filter(c => c._id !== (editCategory ? editCategory._id : null)) // Ne pas inclure la catégorie en cours d'édition
                .map(category => (
                  <Option key={category._id} value={category._id}>
                    {`${' '.repeat(category.depth * 2)}${category.name}`} {/* Ajout d'indentation */}
                  </Option>
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
      </Card>
      </div>
      <FooterAdmin />
    </div>
  );
};

export default withAdminAuth(AdminCategories, ['admin', 'editor']);

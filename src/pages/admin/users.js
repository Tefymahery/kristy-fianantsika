import withAdminAuth from '@/components/admin/withAdminAuth';
import NavbarAdmin from "@/components/admin/NavbarAdmin";
import FooterAdmin from "@/components/admin/FooterAdmin";


import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Input,
  Select,
  Option,
  Switch,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/users`;

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showEditConfirm, setShowEditConfirm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "guest",
  });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createOrUpdateUser = async () => {
    try {
      if (currentUser) {
        // Modification
        await axios.put(`${API_URL}/${currentUser._id}`, formData);
      } else {
        // Ajout
        await axios.post(API_URL, formData);
      }
      fetchUsers();
      setShowDialog(false);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
    }
  };

  const resetForm = () => {
    setCurrentUser(null);
    setFormData({ name: "", email: "", password: "", role: "guest" });
  };

  const handleSubmit = () => {
    if (currentUser) {
      setShowEditConfirm(true);
    } else {
      createOrUpdateUser();
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
      setShowConfirmDialog(false);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setShowConfirmDialog(true);
  };

  const toggleStatus = async (id, isActive) => {
    try {
      await axios.put(`${API_URL}/${id}/status`, { isActive: !isActive });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors du changement de statut :", error);
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
    });
    setShowDialog(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 mt-4">
      <NavbarAdmin />
      <div className="p-8 space-y-8">
        <Card className="shadow-lg">
          <CardHeader className="bg-gray-100 dark:bg-gray-800 p-6 rounded-t-md">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Gestion des utilisateurs</h3>
              <Button onClick={() => {
                resetForm();
                setShowDialog(true);
              }}>
                Ajouter un utilisateur
              </Button>
            </div>
          </CardHeader>
          <CardBody className="p-6">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700 text-left">
                  <th className="px-4 py-2">Nom</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Rôle</th>
                  <th className="px-4 py-2">Statut</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="px-4 py-2">{user.name}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">{user.role}</td>
                    <td className="px-4 py-2">
                      <Switch
                        checked={user.isActive}
                        onChange={() => {
                          if (user.role !== "admin") {
                            toggleStatus(user._id, user.isActive);
                          } else {
                            alert("Impossible de désactiver un utilisateur de type Admin.");
                          }
                        }}
                        disabled={user.role === "admin"} // Désactive le switch si l'utilisateur est admin
                      />
                    </td>

                    <td className="px-4 py-2 space-x-2">
                      <Button size="sm" onClick={() => handleEdit(user)}>
                        Modifier
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => confirmDelete(user._id)}
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>

        {/* Dialog pour ajouter ou modifier un utilisateur */}
        <Dialog open={showDialog} handler={setShowDialog}>
          <DialogHeader>
            {currentUser ? "Modifier l'utilisateur" : "Ajouter un utilisateur"}
          </DialogHeader>
          <DialogBody className="space-y-4">
            <Input
              name="name"
              label="Nom"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="password"
              label="Mot de passe"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Select
              name="role"
              label="Rôle"
              value={formData.role}
              onChange={(value) => setFormData({ ...formData, role: value })}
            >
              <Option value="admin">Admin</Option>
              <Option value="moderator">Modérateur</Option>
              <Option value="editor">Éditeur</Option>
              <Option value="registered">Utilisateur enregistré</Option>
              <Option value="guest">Invité</Option>
            </Select>
          </DialogBody>
          <DialogFooter className="space-x-4">
            <Button onClick={() => setShowDialog(false)} color="red">
              Annuler
            </Button>
            <Button onClick={handleSubmit} color="green">
              {currentUser ? "Modifier" : "Ajouter"}
            </Button>
          </DialogFooter>
        </Dialog>

        {/* Dialog de confirmation pour la suppression */}
        <Dialog open={showConfirmDialog} handler={setShowConfirmDialog}>
          <DialogHeader>Confirmer la suppression</DialogHeader>
          <DialogBody>
            Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.
          </DialogBody>
          <DialogFooter>
            <Button color="red" onClick={() => setShowConfirmDialog(false)}>
              Annuler
            </Button>
            <Button
              color="green"
              onClick={() => handleDelete(selectedUserId)}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </Dialog>

        {/* Dialog de confirmation pour la modification */}
        <Dialog open={showEditConfirm} handler={setShowEditConfirm}>
          <DialogHeader>Confirmer la modification</DialogHeader>
          <DialogBody>
            Êtes-vous sûr de vouloir appliquer ces modifications ?
          </DialogBody>
          <DialogFooter>
            <Button color="red" onClick={() => setShowEditConfirm(false)}>
              Annuler
            </Button>
            <Button
              color="green"
              onClick={() => {
                createOrUpdateUser();
                setShowEditConfirm(false);
              }}
            >
              Confirmer
            </Button>
          </DialogFooter>
        </Dialog>
      </div>
      <FooterAdmin />
    </div>
  );
}

export default withAdminAuth(UserManagement,  ['admin', 'editor']);

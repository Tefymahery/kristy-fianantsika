import React from "react";
import { Button , Ty } from "@material-tailwind/react";
import { useUser } from '../../context/UserContext'; // Import du hook useUser

const FooterAdmin = () => {
  const { user, logout } = useUser(); // Accéder à l'utilisateur et à la fonction logout

  return (
    <footer className="bg-gray-800 p-4 text-center text-white">
      <div className="container mx-auto">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>

        {/* Afficher le nom de l'utilisateur et la possibilité de se déconnecter si l'utilisateur est connecté */}
        {user && (
          <>
            <p className="text-sm mt-2">Connecté en tant que {user.name}</p>
            <Button
              onClick={logout} // Déconnexion via le contexte
              variant="filled"
              color="red"
              className="mt-4"
            >
              Déconnexion
            </Button>
          </>
        )}
      </div>
    </footer>
  );
};

export default FooterAdmin;

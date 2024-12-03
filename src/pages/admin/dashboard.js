import withAdminAuth from '@/components/admin/withAdminAuth';
import { useUser } from '../../context/UserContext';
import FooterAdmin from '@/components/admin/FooterAdmin';
import NavbarAdmin from '@/components/admin/NavbarAdmin'
import { Typography } from '@material-tailwind/react';
import IconButtonHome from '@/components/IconButtonHome';

const Dashboard = () => {
  const { user, loading } = useUser(); // Utilise le contexte pour obtenir l'utilisateur et l'état de chargement
  
  if (loading) {
    return <div><p>Chargement...</p></div>; // Attendre que le loading soit à false avant d'afficher la page
  }

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <NavbarAdmin />
       <div className='flex flex-1 flex-col justify-center items-center text-center py-16 px-4 sm:px-8 md:px-12'>
          <Typography variant='h3' color='blue' textGradient>
            Bienvenue sur votre tableau de bord {user.name}
          </Typography>
          <IconButtonHome />
        </div>
     
      <FooterAdmin />
    </div>
  );
  
};

export default withAdminAuth(Dashboard, ['admin', 'editor', 'moderator']);

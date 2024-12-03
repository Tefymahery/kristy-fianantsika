// src/utils/roleRedirect.js
export const roleRedirect = (user, router) => {
    switch (user.role) {
      case 'admin':
        router.push('/admin/dashboard');
        break;
      case 'moderator':
        router.push('/admin/reports');
        break;
      case 'editor':
        router.push('/admin/articles');
        break;
      default:
        router.push('/'); // Accueil pour les autres
    }
  };
  
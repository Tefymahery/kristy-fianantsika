// src/components/admin/withAdminAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@/context/UserContext';

const withAdminAuth = (WrappedComponent, allowedRoles = ['admin']) => {
  const AuthenticatedComponent = (props) => {
    const { user, loading } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (loading) return; // Attendre le chargement du contexte utilisateur
      if (!user || !allowedRoles.includes(user.role)) {
        console.log('Accès refusé. Redirection...');
        if (router.pathname.startsWith('/admin')) {
          router.push('/admin/forbidden');
        } 
      }
    }, [user, loading, router]);

    if (loading || !user || !allowedRoles.includes(user.role)) {
      return <p>Chargement...</p>; // Afficher un message de chargement
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAdminAuth;

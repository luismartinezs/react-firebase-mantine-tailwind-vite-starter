import { Navigate, useLocation } from 'react-router-dom';

import { Loader } from '@mantine/core';

import { useUserData } from '@/features/userData';

export interface IRequireAuthProps {
  children: JSX.Element;
  asAdmin?: boolean;
}

function RequireAuth({ children, asAdmin = false }: IRequireAuthProps): JSX.Element {
  const { userData, isLoading, isError, error } = useUserData();
  const location = useLocation();
  const pathname = '/404'; // should be a path that doesn't require admin

  if (isLoading) {
    return <Loader />;
  }

  if (isError && error instanceof Error) {
    throw error;
  }

  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  if (asAdmin && !userData.isAdmin && location.pathname !== pathname) {
    return <Navigate to={pathname} replace />;
  }

  return children;
}

export default RequireAuth;

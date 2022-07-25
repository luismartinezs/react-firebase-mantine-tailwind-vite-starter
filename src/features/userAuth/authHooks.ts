import { signOut } from 'firebase/auth';
import { useHttpsCallable } from 'react-firebase-hooks/functions';

import queryClient from '@/app/queryClient';
import { useFunctions, useAuth } from '@/services/firebase';

export const useDeleteUser = () => {
  const [_deleteUser, pendingDeleteUser, errorDeleteUser] = useHttpsCallable(useFunctions(), 'deleteUser');
  const { logout } = useLogout();

  const deleteUser = async () => {
    await _deleteUser();
    await logout();
  };

  return {
    deleteUser,
    pendingDeleteUser,
    errorDeleteUser,
  };
};

export const useLogout = () => {
  const logout = async () => {
    await signOut(useAuth());
    queryClient.removeQueries();
  };
  return {
    logout,
  };
};

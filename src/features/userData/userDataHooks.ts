import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useAuth } from '@/services/firebase';
import userDataAPI from './userDataApi';
import queryKeys from '@/app/queryKeys';

export function useUserData() {
  const [authUser, isAuthLoading, authError] = useAuthState(useAuth(), {
    // eslint-disable-next-line @typescript-eslint/require-await
    onUserChanged: async (user) => {
      if (!user) {
        console.log('Not logged in');
        return;
      }
    },
  });

  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
    error: userDataError,
  } = useQuery([queryKeys.userDataKey, authUser?.uid], async () => userDataAPI.getUserData(authUser?.uid as string), {
    enabled: !!authUser?.uid,
  });

  return {
    authUser,
    isAuthLoading,
    userData,
    isUserDataLoading,
    isUserDataError,
    userDataError,
    isLoading: isAuthLoading || isUserDataLoading,
    isError: !!authError || isUserDataError,
    error: authError || userDataError,
  };
}

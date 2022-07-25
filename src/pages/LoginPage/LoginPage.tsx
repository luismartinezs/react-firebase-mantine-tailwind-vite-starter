import { FC } from 'react';

import { Stack, Title, Text, Divider } from '@mantine/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import type { User } from 'firebase/auth';

import GoogleSignIn from '@/features/userAuth/GoogleSignIn';
import LoginWithEmailAndPasssword from '@/features/userAuth/LoginWithEmailAndPasssword';
import ServerStateDisplayWrapper from '@/components/ServerStateDisplayWrapper';
import { useAuth } from '@/services/firebase';
import { userDataAPI } from '@/features/userData';
import { Link } from 'react-router-dom';

let prevUser: User | null = null;

const LoginPage: FC = (): JSX.Element => {
  const [authUser, loading, error] = useAuthState(useAuth(), {
    onUserChanged: async (user) => {
      if (user && prevUser !== user) {
        await userDataAPI.initUserData(user);
        prevUser = user;
      }
    },
  });

  return (
    <>
      <Title order={1}>Login page</Title>
      <Divider my="sm" />
      <ServerStateDisplayWrapper
        data={authUser}
        isLoading={loading}
        isError={!!error}
        error={error}
        noDataComponent={
          <>
            <Stack mt={12}>
              <GoogleSignIn />
              <Text>Or login with email and password:</Text>
              <LoginWithEmailAndPasssword />
            </Stack>
            <div className="mt-4">
              <Text component={Link} variant="link" mt={6} to="/sign-up">
                Or create an account
              </Text>
            </div>
          </>
        }
      >
        <p className="prose-invert">
          You&apos;re already logged in.{' '}
          <Text component={Link} to="/" variant="link">
            Go to home
          </Text>
        </p>
      </ServerStateDisplayWrapper>
    </>
  );
};

export default LoginPage;

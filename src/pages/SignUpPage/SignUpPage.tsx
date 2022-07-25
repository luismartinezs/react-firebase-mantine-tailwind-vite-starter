import { FC } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import type { User } from 'firebase/auth';
import { Title, Text, Divider, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

import { useAuth } from '@/services/firebase';
import { userDataAPI } from '@/features/userData';
import SignUpWithEmailAndPassword from '@/features/userAuth/SignUpWithEmailAndPassword';
import GoogleSignIn from '@/features/userAuth/GoogleSignIn';
import ServerStateDisplayWrapper from '@/components/ServerStateDisplayWrapper';

let prevUser: User | null = null;

const SignUpPage: FC = (): JSX.Element => {
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
      <Title order={1}>Create your account</Title>
      <Divider my="sm" />
      <ServerStateDisplayWrapper
        data={authUser}
        isLoading={loading}
        isError={!!error}
        error={error}
        noDataComponent={
          <>
            <Stack mt={12}>
              <GoogleSignIn label="Google Sign Up" />
              <Text>Or sign up with email and password:</Text>
              <SignUpWithEmailAndPassword />
            </Stack>
            <div className="mt-4">
              <Text component={Link} variant="link" mt={6} to="/login">
                Or login if your already have an account
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

export default SignUpPage;

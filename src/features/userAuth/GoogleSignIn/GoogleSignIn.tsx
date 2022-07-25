import { FC } from 'react';

import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { Button } from '@mantine/core';
import { BrandGoogle } from 'tabler-icons-react';

import { useAuth } from '@/services/firebase';
import { IGoogleSignInProps } from './GoogleSignIn.props';
import ErrorMessage from '@/components/ErrorMessage';

const GoogleSignIn: FC<IGoogleSignInProps> = ({ label = 'Login with Google' }): JSX.Element => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(useAuth());

  return (
    <>
      <Button
        leftIcon={<BrandGoogle />}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signInWithGoogle()}
        className="w-full lg:w-60"
        loading={loading}
      >
        {label}
      </Button>
      {!!error && (
        <div className="mt-4">
          <ErrorMessage>{error instanceof Error ? error.message : 'There was an error'}</ErrorMessage>
        </div>
      )}
    </>
  );
};

export default GoogleSignIn;

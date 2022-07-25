import { FC } from 'react';

import invariant from 'tiny-invariant';
import { Button, Title, Stack, Loader } from '@mantine/core';

import { useUserData } from '@/features/userData';
import { useDeleteUser, useLogout } from '@/features/userAuth';

const AccountPage: FC = (): JSX.Element => {
  const { userData } = useUserData();

  // this is a way to let typescript know that userData is not null. If userData is null, it will throw an error. It's an unorthodox way to say "if we don't have user data here, something went very wrong and the code might be broken"
  invariant(userData, 'User data not available!');

  const { deleteUser, pendingDeleteUser, errorDeleteUser } = useDeleteUser();
  const { logout } = useLogout();

  return (
    <>
      <Title order={1}>Account page</Title>
      <div className="w-full lg:w-60">
        <Stack align="flex-start" className="mt-4">
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Button fullWidth onClick={logout}>
            Logout
          </Button>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <Button fullWidth onClick={deleteUser} variant="outline">
            {pendingDeleteUser ? <Loader size="sm" /> : 'Delete my account'}
          </Button>
        </Stack>
      </div>
      {errorDeleteUser && <p>Failed to delete user: {errorDeleteUser.message}</p>}
    </>
  );
};

export default AccountPage;

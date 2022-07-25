import { FC } from 'react';

import { List, Title } from '@mantine/core';
import { useUserData } from '@/features/userData';
import ServerStateDisplayWrapper from '@/components/ServerStateDisplayWrapper';

const UserDataView: FC = (): JSX.Element => {
  const { userData, isUserDataLoading, isUserDataError, userDataError } = useUserData();

  return (
    <>
      <Title order={3}>User data:</Title>
      <ServerStateDisplayWrapper
        data={userData}
        isLoading={isUserDataLoading}
        isError={isUserDataError}
        error={userDataError}
      >
        {userData && (
          <List className="list-none break-words mt-4 flex flex-col space-y-2">
            <List.Item>
              <span className="text-gray-500">Name: </span>
              <span>{userData.name}</span>
            </List.Item>
            <List.Item>
              <span className="text-gray-500">Email: </span>
              <span>{userData.email}</span>
            </List.Item>
            <List.Item>
              <span className="text-gray-500">Uid: </span>
              <span>{userData.uid}</span>
            </List.Item>
            <List.Item>
              <span className="text-gray-500">isAdmin: </span>
              <span>{String(userData.isAdmin)}</span>
            </List.Item>
            <List.Item>
              <span className="text-gray-500">authProvider: </span>
              <span>{userData.authProvider}</span>
            </List.Item>
          </List>
        )}
      </ServerStateDisplayWrapper>
    </>
  );
};

export default UserDataView;

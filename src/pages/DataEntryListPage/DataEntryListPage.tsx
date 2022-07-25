import { FC } from 'react';

import { useDataEntries } from '@/features/dataEntries';
import DataEntryView from '@/features/DataEntryView';
import { Link } from 'react-router-dom';
import { Loader, Title, List, Text } from '@mantine/core';
import ErrorMessage from '@/components/ErrorMessage';

const DataEntryListPage: FC = (): JSX.Element => {
  const { data: dataEntries, isLoading, isError, error } = useDataEntries();

  const pageWrapper = (content: JSX.Element) => {
    return (
      <>
        <Title order={1}>Data entry list page</Title>
        {content}
      </>
    );
  };

  if (isLoading) {
    return pageWrapper(<Loader />);
  }

  if (isError) {
    return pageWrapper(
      <ErrorMessage>Error: {error instanceof Error ? error.message : 'Unable to get data entries'}</ErrorMessage>
    );
  }

  if (!dataEntries) {
    return pageWrapper(<p>No data entries available!</p>);
  }

  return pageWrapper(
    <List className="list-none break-words mt-4 flex flex-col space-y-4">
      {dataEntries.map((dataEntry) => {
        if (!dataEntry.id) {
          return null;
        }

        return (
          <List.Item key={dataEntry.id}>
            <Text component={Link} variant="link" to={`/data-entry/${dataEntry.id}`}>
              <DataEntryView dataEntry={dataEntry} />
            </Text>
          </List.Item>
        );
      })}
    </List>
  );
};

export default DataEntryListPage;

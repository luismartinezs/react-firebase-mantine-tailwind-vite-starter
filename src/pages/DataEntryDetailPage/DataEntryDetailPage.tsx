import { FC } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import DataEntryView from '@/features/DataEntryView';
import { useDataEntry, useDeleteDataEntry, useEditDataEntry } from '@/features/dataEntries';
import { serverTimestamp, type Timestamp } from 'firebase/firestore';
import { Button, Loader, Space, Stack, Title } from '@mantine/core';
import ErrorMessage from '@/components/ErrorMessage';

const DataEntryDetailPage: FC = (): JSX.Element => {
  const { entryUid } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteDataEntry } = useDeleteDataEntry();
  const { mutate: editDataEntry } = useEditDataEntry();

  if (typeof entryUid === 'undefined') {
    navigate('/404');
    return <></>;
  }

  const { data: dataEntry, isLoading, isError, error } = useDataEntry(entryUid);

  const pageWrapper = (content: JSX.Element) => (
    <>
      <Title order={1}>Data entry detail page</Title>
      <div className="mt-4">{content}</div>
    </>
  );

  if (isLoading) {
    return pageWrapper(<Loader />);
  }

  if (isError) {
    return pageWrapper(
      <ErrorMessage>Error: {error instanceof Error ? error.message : 'Unable to get entry'}</ErrorMessage>
    );
  }

  if (!dataEntry) {
    return pageWrapper(<p className="prose-invert">Entry not available!</p>);
  }

  const handleDeleteDataEntry = () => {
    if (typeof entryUid === 'undefined') {
      return;
    }
    deleteDataEntry(entryUid);
    navigate('/data-entry');
  };

  const handleEditDataEntry = () => {
    if (typeof entryUid === 'undefined') {
      return;
    }
    editDataEntry({
      id: entryUid,
      newDataEntry: {
        timestamp: serverTimestamp() as Timestamp,
      },
    });
    navigate('/data-entry');
  };

  return pageWrapper(
    <>
      <DataEntryView dataEntry={dataEntry} />
      <Space h="md" />
      <div className="w-full lg:w-60">
        <Stack align="flex-start" className="mt-4">
          <Button fullWidth onClick={handleDeleteDataEntry}>
            Delete entry
          </Button>
          <Button fullWidth onClick={handleEditDataEntry}>
            Update entry timestamp
          </Button>
        </Stack>
      </div>
    </>
  );
};

export default DataEntryDetailPage;

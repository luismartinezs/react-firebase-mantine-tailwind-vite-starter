import { FC } from 'react';

import { useNavigate } from 'react-router-dom';

import { useCreateDataEntry } from '@/features/dataEntries';
import { Button, Title } from '@mantine/core';

const NewDataEntryPage: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { mutate: createDataEntry } = useCreateDataEntry();

  const handleCreateDataEntry = () => {
    createDataEntry();
    navigate('/data-entry');
  };
  return (
    <>
      <Title order={1}>New data entry page</Title>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <Button onClick={handleCreateDataEntry} className="mt-4">
        Create new data entry
      </Button>
    </>
  );
};

export default NewDataEntryPage;

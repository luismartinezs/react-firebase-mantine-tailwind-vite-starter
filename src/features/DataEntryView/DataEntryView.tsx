import { FC } from 'react';

import { Card, Stack } from '@mantine/core';

import { IDataEntryViewProps } from './DataEntryView.props';

const DataEntryView: FC<IDataEntryViewProps> = ({ dataEntry }): JSX.Element => {
  return (
    <Card>
      <Stack spacing="xs">
        <div>
          <span className="text-gray-500">Id: </span>
          <span>{dataEntry.id}&nbsp;</span>
        </div>
        <div>
          <span className="text-gray-500">Timestamp:</span>
          <span>{dataEntry.timestamp && +dataEntry.timestamp}&nbsp;</span>
        </div>
        <div>
          <span className="text-gray-500">User uid:</span>
          <span>{dataEntry.userUid}</span>
        </div>
      </Stack>
    </Card>
  );
};

export default DataEntryView;

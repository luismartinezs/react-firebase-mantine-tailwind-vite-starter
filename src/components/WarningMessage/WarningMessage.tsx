import { FC } from 'react';

import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

import { IWarningMessageProps } from './WarningMessage.props';

const WarningMessage: FC<IWarningMessageProps> = ({ children, warningMessage = '' }): JSX.Element => {
  return (
    <Alert icon={<AlertCircle size={16} />} title="Bummer!" color="yellow">
      {children || warningMessage}
    </Alert>
  );
};

export default WarningMessage;

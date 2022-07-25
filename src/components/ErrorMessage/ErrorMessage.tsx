import { FC } from 'react';

import { IErrorMessageProps } from './ErrorMessage.props';
import { Alert } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';

const ErrorMessage: FC<IErrorMessageProps> = ({ children }): JSX.Element => {
  return (
    <Alert icon={<AlertCircle size={16} />} color="red">
      {children}
    </Alert>
  );
};

export default ErrorMessage;

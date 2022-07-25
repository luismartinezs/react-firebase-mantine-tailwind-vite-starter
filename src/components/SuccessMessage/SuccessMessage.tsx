import { FC, useState } from 'react';

import { Alert } from '@mantine/core';
import { Confetti } from 'tabler-icons-react';

import { ISuccessMessageProps } from './SuccessMessage.props';

const SuccessMessage: FC<ISuccessMessageProps> = ({ children, onClose, successMessage = '' }): JSX.Element => {
  const [show, setShow] = useState(true);

  if (!show) {
    return <></>;
  }

  return (
    <Alert
      icon={<Confetti size={48} strokeWidth={2} />}
      color="green"
      title="Hooray!"
      withCloseButton
      onClose={() => {
        setShow(false);
        onClose && onClose();
      }}
      closeButtonLabel="Close alert"
    >
      {children || successMessage}
    </Alert>
  );
};

export default SuccessMessage;

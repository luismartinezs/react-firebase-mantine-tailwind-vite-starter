import { FC } from 'react';

import { Button } from '@mantine/core';
import { ICtaButtonProps } from './CtaButton.props';

const CtaButton: FC<ICtaButtonProps> = ({ children, onClick = () => null, disabled = false }): JSX.Element => {
  return (
    <Button
      size="lg"
      fullWidth
      variant="gradient"
      gradient={{ from: 'indigo', to: 'blue', deg: 60 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default CtaButton;

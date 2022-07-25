import { FC } from 'react';

import { Anchor } from '@mantine/core';

const RecaptchaMessage: FC = (): JSX.Element => {
  return (
    <div>
      This site is protected by reCAPTCHA and the Google&nbsp;
      <Anchor href="https://policies.google.com/privacy">Privacy Policy</Anchor> and&nbsp;
      <Anchor href="https://policies.google.com/terms">Terms of Service</Anchor> apply.
    </div>
  );
};

export default RecaptchaMessage;

import React from 'react';

import { Title } from '@mantine/core';

const HomePage = () => {
  return (
    <>
      <Title order={1}>HomePage</Title>
      <p className="prose-invert">This is a public page that anybody can access</p>
    </>
  );
};

export default HomePage;

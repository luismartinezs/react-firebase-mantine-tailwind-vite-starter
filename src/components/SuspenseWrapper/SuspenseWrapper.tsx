import React, { Suspense, type FC } from 'react';

import { Loader } from '@mantine/core';

import { ISuspenseWrapperProps } from './SuspenseWrapper.props';

const SuspenseWrapper: FC<ISuspenseWrapperProps> = (props) => {
  return (
    <Suspense fallback={<Loader />} {...props}>
      {props.children}
    </Suspense>
  );
};

export default SuspenseWrapper;

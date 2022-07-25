import React from 'react';

import type { FallbackProps } from 'react-error-boundary';
import ErrorMessage from '@/components/ErrorMessage';

function DynamicErrorView({ error }: FallbackProps): JSX.Element {
  return <ErrorMessage>Error: {error?.message}</ErrorMessage>;
}

export default DynamicErrorView;

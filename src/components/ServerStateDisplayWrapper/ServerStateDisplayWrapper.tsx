/**
 * Use this component to wrap a component whose state depends on fetching data from the server
 */

import { FC } from 'react';

import { Loader, Text } from '@mantine/core';

import { IServerStateDisplayWrapperProps } from './ServerStateDisplayWrapper.props';
import ErrorMessage from '@/components/ErrorMessage';

const ServerStateDisplayWrapper: FC<IServerStateDisplayWrapperProps> = ({
  children,
  data,
  isLoading,
  isError,
  error,
  hideNoDataMsg = false,
  label = '',
  noDataComponent = null,
}): JSX.Element => {
  if (isLoading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        Error{` ${label}`}: {error instanceof Error ? error.message : 'unknown error'}
      </ErrorMessage>
    );
  }

  if (!data) {
    if (hideNoDataMsg) {
      return <></>;
    }

    if (noDataComponent) {
      return <>{noDataComponent}</>;
    }

    return (
      <div className="w-full flex items-center justify-center">
        <Text>No data</Text>
      </div>
    );
  }

  return <>{children}</>;
};

export default ServerStateDisplayWrapper;

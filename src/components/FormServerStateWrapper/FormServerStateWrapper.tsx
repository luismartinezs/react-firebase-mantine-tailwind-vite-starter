/**
 * Use this component to wrap a component whose state depends on changing server data (usually a form, but it could be something else)
 */

import { LoadingOverlay } from '@mantine/core';
import { FC } from 'react';

import { IFormServerStateWrapperProps } from './FormServerStateWrapper.props';
import ErrorMessage from '@/components/ErrorMessage';
import SuccessMessage from '@/components/SuccessMessage';

const FormServerStateWrapper: FC<IFormServerStateWrapperProps> = ({
  children,
  isLoading,
  isError,
  error,
  isSuccess,
  successMessage,
  onCloseSuccessMessage = () => null,
}): JSX.Element => {
  return (
    <div className="w-full relative">
      <>
        <LoadingOverlay visible={isLoading} />
        {children}
        {isError && (
          <div className="mt-4">
            <ErrorMessage>{error instanceof Error ? error.message : 'There was an error'}</ErrorMessage>
          </div>
        )}
        {isSuccess && (
          <div className="mt-4">
            <SuccessMessage onClose={() => onCloseSuccessMessage()} successMessage={successMessage} />
          </div>
        )}
      </>
    </div>
  );
};

export default FormServerStateWrapper;

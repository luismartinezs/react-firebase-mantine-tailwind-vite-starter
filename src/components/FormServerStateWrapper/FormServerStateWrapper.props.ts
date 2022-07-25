export interface IFormServerStateWrapperProps {
  children?: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  isSuccess: boolean;
  successMessage: string;
  onCloseSuccessMessage?: () => void;
}

export interface IServerStateDisplayWrapperProps {
  children: React.ReactNode;
  data: any;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  hideNoDataMsg?: boolean;
  label?: string;
  noDataComponent?: React.ReactNode;
}

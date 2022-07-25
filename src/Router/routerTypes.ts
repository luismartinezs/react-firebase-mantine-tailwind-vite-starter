import type { IRequireAuthProps } from '@/features/userAuth/RequireAuth';

export interface IRoute {
  path: string;
  element: React.ComponentType;
  exact?: boolean;
  requireAuth?: Omit<IRequireAuthProps, 'children'>;
}

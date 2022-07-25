import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import Layout from '@/Layout';
import { RequireAuth } from '@/features/userAuth';
import type { IRoute } from './routerTypes';
import DynamicErrorView from '@/components/DynamicErrorView';
import SuspenseWrapper from '@/components/SuspenseWrapper';

const HomePage = React.lazy(() => import('@/pages/HomePage'));
const AccountPage = React.lazy(() => import('@/pages/AccountPage'));
const NotFoundPage = React.lazy(() => import('@/pages/NotFoundPage'));
const LoginPage = React.lazy(() => import('@/pages/LoginPage'));
const DataEntryDetailPage = React.lazy(() => import('@/pages/DataEntryDetailPage'));
const NewDataEntryPage = React.lazy(() => import('@/pages/NewDataEntryPage'));
const DataEntryListPage = React.lazy(() => import('@/pages/DataEntryListPage'));
const AdminPage = React.lazy(() => import('@/pages/AdminPage'));
const SignUpPage = React.lazy(() => import('@/pages/SignUpPage'));

export const lazyRoutes: IRoute[] = [
  // example of public route
  { path: '/', exact: true, element: HomePage },
  { path: '/login', element: LoginPage },
  { path: '/sign-up', element: SignUpPage },
  // example of private route
  { path: '/account', element: AccountPage, requireAuth: {} },
  { path: '/data-entry', element: DataEntryListPage, requireAuth: {} },
  { path: '/data-entry/new', element: NewDataEntryPage, requireAuth: {} },
  { path: '/data-entry/:entryUid', element: DataEntryDetailPage, requireAuth: {} },
  // example of private route only accessible to admins
  {
    path: '/admin',
    element: AdminPage,
    requireAuth: { asAdmin: true },
  },
  { path: '*', element: NotFoundPage },
];

export const withErrorBoundary = (Component: IRoute['element']) => (
  <ErrorBoundary FallbackComponent={DynamicErrorView}>
    <Component />
  </ErrorBoundary>
);

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {lazyRoutes.map(({ requireAuth, element: Element, ...routeProps }) => {
          if (requireAuth) {
            return (
              <Route
                key={routeProps.path}
                {...routeProps}
                element={
                  <RequireAuth {...requireAuth}>
                    <SuspenseWrapper>{withErrorBoundary(Element)}</SuspenseWrapper>
                  </RequireAuth>
                }
              />
            );
          }

          return (
            <Route
              key={routeProps.path}
              {...routeProps}
              element={<SuspenseWrapper>{withErrorBoundary(Element)}</SuspenseWrapper>}
            />
          );
        })}
      </Route>
    </Routes>
  );
};

export default Router;

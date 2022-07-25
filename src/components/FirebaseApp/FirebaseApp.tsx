import React, { FC, useEffect } from 'react';

import { initFirebaseApp } from '@/services/firebase';
import { IFirebaseAppProps } from './FirebaseApp.props';

const FirebaseApp: FC<IFirebaseAppProps> = ({ children }): JSX.Element => {
  const [isInitialized, setIsInitialized] = React.useState(false);

  useEffect(() => {
    initFirebaseApp();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return <div>Initializing firebase app...</div>;
  }

  return <>{children}</>;
};

export default FirebaseApp;

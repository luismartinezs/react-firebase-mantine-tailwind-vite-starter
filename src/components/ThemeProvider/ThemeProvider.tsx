import { FC } from 'react';

import { MantineProvider, type MantineThemeOverride } from '@mantine/core';

import { IThemeProviderProps } from './ThemeProvider.props';

const ThemeProvider: FC<IThemeProviderProps> = ({ children }): JSX.Element => {
  const theme: MantineThemeOverride = {
    colorScheme: 'dark',
  };

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

export default ThemeProvider;

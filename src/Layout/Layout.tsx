import { useState } from 'react';

import { Outlet } from 'react-router-dom';
import { AppShell, Navbar, Header, Footer, Aside, Text, MediaQuery, Burger, useMantineTheme } from '@mantine/core';

import NavMenu from '@/components/NavMenu';
import UserDataView from '@/features/userData/UserDataView';
import RecaptchaMessage from '@/components/RecaptchaMessage';

const Layout: React.FC = (): JSX.Element => {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      fixed
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200 }}>
          <Navbar.Section grow mt="md">
            <NavMenu />
          </Navbar.Section>
        </Navbar>
      }
      aside={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
            <UserDataView />
          </Aside>
        </MediaQuery>
      }
      footer={
        <Footer height={100} p="md" className="text-gray-400">
          <Text size="sm">
            <RecaptchaMessage />
          </Text>
          <Text size="sm">React Firebase Mantine Tailwind Starter @2022 by Luis Martinez Suarez</Text>
        </Footer>
      }
      header={
        <Header height={70} p="md">
          <div className="flex items-center h-full">
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Text>React Firebase Mantine Tailwind Starter</Text>
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  );
};

export default Layout;

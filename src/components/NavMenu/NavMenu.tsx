import { FC } from 'react';

import { NavLink } from 'react-router-dom';
import { List, Text, Divider } from '@mantine/core';
import OnlyUserAs, { type IOnlyUserAsProps } from '@/components/OnlyUserAs';

interface IMenuItem {
  label: string;
  path: string;
  access?: IOnlyUserAsProps;
  divider?: boolean;
  title?: string;
}

const menuItems: IMenuItem[] = [
  { path: '/', label: 'Home' },
  { path: '/login', label: 'Login', access: { asGuest: true } },
  { path: '/sign-up', label: 'Sign up', access: { asGuest: true } },
  { path: '/data-entry', label: 'All entries', access: { asLoggedIn: true } },
  { path: '/data-entry/new', label: 'Create entry', access: { asLoggedIn: true } },
  { path: '/admin', label: 'Admin', access: { asAdmin: true }, divider: true, title: 'Admin' },
  { path: '/account', label: 'Account', access: { asLoggedIn: true }, divider: true },
];

const NavMenu: FC = (): JSX.Element => {
  return (
    <List className="list-none">
      {menuItems.map((item) => {
        const { path, label, access, divider, title } = item;
        return (
          <OnlyUserAs key={path} {...access}>
            {divider && <Divider my="xs" />}
            {title && (
              <Text transform="uppercase" size="sm" py={6}>
                {title}
              </Text>
            )}
            <List.Item py={6}>
              <Text variant="link" component={NavLink} to={path}>
                {label}
              </Text>
            </List.Item>
          </OnlyUserAs>
        );
      })}
    </List>
  );
};

export default NavMenu;

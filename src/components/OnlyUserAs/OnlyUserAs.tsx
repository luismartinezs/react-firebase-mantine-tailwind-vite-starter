/**
 * asAdmin = show content only to admin
 * asUser = show content only to user
 * asLoggedIn = show content to logged in users, same as asUser and asAdmin
 * asGuest = show content to guests only
 * No "public" prop is required, as then you shouldn't use this wrapper at all
 * If no props are provided, the wrapper does nothing (public content)
 */

import React from 'react';

import { useUserData } from '@/features/userData';
import { IOnlyUserAsProps } from './OnlyUserAs.props';

const OnlyUserAs: React.FC<IOnlyUserAsProps> = ({ children, ...rest }): JSX.Element => {
  const { asGuest, asLoggedIn, asUser, asAdmin } = rest;
  const { userData } = useUserData();
  let isAdmin = false;

  if (userData) {
    isAdmin = !!userData.isAdmin;
  }

  const isGuest = !userData;
  const isLoggedIn = !!userData;
  const isUser = !!userData && !isAdmin;

  // if all are undefined, show public content
  let show = Object.values(rest).every((prop) => typeof prop === 'undefined');

  if (isGuest && asGuest) {
    show = true;
  }

  if (isLoggedIn && asLoggedIn) {
    show = true;
  }

  if (isUser && asUser) {
    show = true;
  }

  if (isAdmin && asAdmin) {
    show = true;
  }

  return show ? <>{children}</> : <></>;
};

export default OnlyUserAs;

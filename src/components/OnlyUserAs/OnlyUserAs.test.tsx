import React from 'react';

import { describe, expect, it, afterEach } from 'vitest';
import { render, cleanup } from '@/util/test';

import OnlyUserAs from '../OnlyUserAs';
import { IOnlyUserAsProps } from './OnlyUserAs.props';

const onlyUserAsProps: IOnlyUserAsProps = {};

afterEach(cleanup);

describe('OnlyUserAs component', () => {
  it('should render children if no props provided', () => {
    const component = render(<OnlyUserAs {...onlyUserAsProps}>Child</OnlyUserAs>);

    expect(component).toBeDefined();
    component.getByText('Child');
  });
});

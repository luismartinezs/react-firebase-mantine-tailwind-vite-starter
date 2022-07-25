import React from 'react';

import { describe, expect, it, afterEach } from 'vitest';
import { render, cleanup } from '@/util/test';

import SuspenseWrapper from '.';
import { ISuspenseWrapperProps } from './SuspenseWrapper.props';

const suspenseWrapperProps: ISuspenseWrapperProps = {};

afterEach(cleanup);

describe('SuspenseWrapper component', () => {
  it('should render correctly with default props', () => {
    const component = render(<SuspenseWrapper {...suspenseWrapperProps}>Child</SuspenseWrapper>);

    expect(component).toBeDefined();
    component.getByText('Child');
  });
});

import React from 'react';
import { render } from '@testing-library/react';

import Index from '../pages/index';

describe('Index', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Index
        socketId="your socket id"
        metaTags={{
          id: '',
          title: 'Hologram',
          description: 'Iam Hologram',
          imageUrl: '',
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});

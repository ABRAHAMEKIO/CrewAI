import React from 'react';
import Box from './Box';

function Layout({ children }: { children: JSX.Element[] }): JSX.Element {
  return (
    <Box
      css={{
        maxW: '100%',
      }}
    >
      {children}
    </Box>
  );
}

export default Layout;

import React from 'react';

function Wrap({ children }: { children: JSX.Element[] }): JSX.Element {
  return <div className="mx-auto">{children}</div>;
}

export default Wrap;

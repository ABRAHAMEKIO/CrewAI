import React from 'react';

function Wrap({
  children,
  className,
}: {
  children: JSX.Element[];
  className?: string;
}): JSX.Element {
  return <div className={className || 'mx-auto'}>{children}</div>;
}

Wrap.defaultProps = {
  className: null,
};

export default Wrap;

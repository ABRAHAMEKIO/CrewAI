import React from 'react';

function Wrap({
  children,
  className,
  style,
}: {
  children: JSX.Element[];
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <div className={className || 'mx-auto'} style={style}>
      {children}
    </div>
  );
}

Wrap.defaultProps = {
  className: null,
  style: null,
};

export default Wrap;

import React from 'react';

function Section({
  children,
  className,
  style,
}: {
  children: JSX.Element;
  className?: string;
  style?: React.CSSProperties;
}): JSX.Element {
  return (
    <section
      className={
        className || 'container max-w-[64rem] mx-auto px-[2rem] lg:px-0'
      }
      style={style}
    >
      {children}
    </section>
  );
}

Section.defaultProps = {
  className: null,
  style: null,
};

export default Section;

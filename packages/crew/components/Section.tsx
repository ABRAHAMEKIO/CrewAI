import React from 'react';

function Section({
  children,
  className,
}: {
  children: JSX.Element;
  className?: string;
}): JSX.Element {
  return (
    <section
      className={
        className || 'container max-w-[64rem] mx-auto px-[2rem] lg:px-0'
      }
    >
      {children}
    </section>
  );
}

Section.defaultProps = {
  className: null,
};

export default Section;

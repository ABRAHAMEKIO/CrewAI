import React from 'react';

function Section({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <section className="container max-w-[64rem] mx-auto px-[2rem] lg:px-0">
      {children}
    </section>
  );
}

export default Section;

import React from "react";

/** Full-bleed wrapper: escapes any centered max-width container (like your Layout) */
const FullBleed: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return (
    <section className={`relative left-1/2 right-1/2 -mx-[50vw] w-screen ${className || ""}`}>
      {children}
    </section>
  );
};

export default FullBleed;

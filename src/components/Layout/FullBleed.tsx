import React from "react";

/** Full-bleed wrapper: escapes container safely on mobile */
const FullBleed: React.FC<React.PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => {
  return (
    <section
      className={[
        "relative left-1/2 right-1/2 -mx-[50vw]",
        // NEVER exceed viewport width
        "w-[100vw] max-w-[100vw]",
        // kill horizontal overflow from children (glows, scales, etc.)
        "overflow-x-clip",
        className || "",
      ].join(" ")}
    >
      {children}
    </section>
  );
};

export default FullBleed;

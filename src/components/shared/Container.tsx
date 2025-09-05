import { CSSProperties, ReactNode } from "react";

function Container({
  children,

  className,
  containerMaxWidth,
  extraChildrenClassname,
  style,
}: {
  children: ReactNode;

  className?: string | undefined;
  containerMaxWidth?: string;
  extraChildrenClassname?: string;
  style?: CSSProperties | undefined;
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-1 ${className}`}
      style={style}
    >
      <section
        style={{ maxWidth: containerMaxWidth || "1400px" }}
        className={`mx-auto mt-8 flex w-full flex-col items-center justify-center gap-1 p-4 pb-0 ${extraChildrenClassname}`}
      >
        {children}
      </section>
    </div>
  );
}

export default Container;

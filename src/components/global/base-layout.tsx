import React, { ReactHTMLElement } from "react";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto  px-4">{children}</div>;
};

export default BaseLayout;

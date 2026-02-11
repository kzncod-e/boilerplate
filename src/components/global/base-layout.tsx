import React, { ReactHTMLElement } from "react";

const BaseLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container bg-background mx-auto  px-4">{children}</div>
    );
};

export default BaseLayout;

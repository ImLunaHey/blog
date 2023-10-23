import { PropsWithChildren } from "react";

export const Paragraph: React.FC<PropsWithChildren> = ({ children }) => {
    return <p className="text-gray-500 dark:text-gray-400">{children}</p>;
};

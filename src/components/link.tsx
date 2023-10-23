import { PropsWithChildren } from "react";

export const Link: React.FC<PropsWithChildren<{ href?: string; colour?: 'red' | 'indigo' | 'green'; }>> = ({ href, children, colour = 'indigo' }) => {
    return <a href={href} className={`font-semibold text-gray-900 underline dark:text-white decoration-${colour}-500`}>{children}</a>;
};

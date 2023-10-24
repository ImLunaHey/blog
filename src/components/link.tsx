import { PropsWithChildren } from "react";

type LinkProps = PropsWithChildren<{ href?: string; external?: boolean; }>;

export const Link: React.FC<LinkProps> = ({ href, children, external = false, ...passthrough }) => {
    // Links to outside websites
    if (external) return <a
        href={href}
        title="This link will take you to an external website."
        className={`font-semibold text-gray-900 underline dark:text-white decoration-pink-500`}
        {...passthrough}
    >{children}</a>;

    // Internal links
    return <a
        href={href}
        hx-get={href}
        hx-push-url="true"
        hx-swap="innerHTML transition:true"
        hx-target="body"
        className={`font-semibold text-gray-900 underline dark:text-white decoration-indigo-500`}
        {...passthrough}
    >{children}</a>;
};

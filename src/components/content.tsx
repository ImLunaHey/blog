import Markdown from "react-markdown";
import rehypeRaw from 'rehype-raw';
import { Link } from "./link";
import { Paragraph } from "./paragraph";

export const Content: React.FC<{ children: string; }> = ({ children }) => {
    return <Markdown
        components={{
            a({ node, ...props }) {
                return <Link {...props} />;
            },
            p({ node, ...props }) {
                return <Paragraph {...props} />;
            }
        }}
        rehypePlugins={[rehypeRaw]}
    >{children}</Markdown>;
};

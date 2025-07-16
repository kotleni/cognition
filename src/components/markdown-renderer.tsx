import {parseMarkdown} from '@/markdown/parser';

interface MarkdownRendererProps {
    markdown: string;
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
    return (
        <div className="p-4">
            {parseMarkdown(props.markdown).map(a => {
                return <span>{a.node.toString()}</span>;
            })}
        </div>
    );
}

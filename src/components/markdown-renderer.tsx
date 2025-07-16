import {parseMarkdown} from '@/markdown/parser';
import {useMemo} from 'react';

interface MarkdownRendererProps {
    markdown: string;
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
    const markdownTokens = useMemo(
        () => parseMarkdown(props.markdown),
        [props.markdown],
    );

    return (
        <div className="p-4">
            {markdownTokens.map((a, index) => {
                return <span key={index}>{a.node.toString()}</span>;
            })}
        </div>
    );
}

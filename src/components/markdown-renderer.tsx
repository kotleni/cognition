interface MarkdownRendererProps {
    markdown: string;
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
    return <div className="p-4">{props.markdown}</div>;
}

'use client';

interface MarkdownEditorProps {
    value: string;
    onChange: (content: string) => void;
}

export function MarkdownEditor({value, onChange}: MarkdownEditorProps) {
    return (
        <textarea
            className="w-full h-full"
            value={value}
            onChange={e => {
                onChange(e.target.value);
            }}
        />
    );
}

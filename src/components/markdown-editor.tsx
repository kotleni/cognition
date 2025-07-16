'use client';

import {useState} from 'react';

interface MarkdownEditorProps {
    onChange: (content: string) => void;
}

export function MarkdownEditor(props: MarkdownEditorProps) {
    const [content, setContent] = useState('');

    return (
        <textarea
            className="w-full h-full"
            value={content}
            onInput={e => {
                setContent(e.target.value);
                props.onChange(content);
            }}
        />
    );
}

export type MarkdownToken = {
    name: string;
    value: string;
    // attrs?: {[key: string]: string};
};

enum Mode {
    PARAGRAPH = 'paragraph',
    TITLE = 'title',
}

export function parseMarkdown(markdown: string): MarkdownToken[] {
    const content = markdown.trim() + '\n';

    const tokens: MarkdownToken[] = [];
    let mode: Mode = Mode.PARAGRAPH;
    let buffer = '';

    for (const ch of content) {
        switch (ch) {
            case '\n':
                if (buffer.length > 0) {
                    tokens.push({name: mode.toString(), value: buffer});
                    buffer = '';
                }
                mode = Mode.PARAGRAPH;
                break;
            case '#':
                mode = Mode.TITLE;
                break;
            default:
                buffer += ch;
                break;
        }
    }

    return tokens;
}

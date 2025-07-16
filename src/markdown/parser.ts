export type MarkdownToken = {
    node: Node;
    value: string;
    // attrs?: {[key: string]: string};
};

abstract class Node {
    abstract tagName: string;
    buffer: string = '';

    toString(): string {
        return `[${this.tagName}:${this.buffer}]`;
    }
}

class Paragraph extends Node {
    tagName: string = 'paragraph';
}

class Title extends Node {
    tagName: string = 'title';
    size: number = 3

    decrementSize() {
        if (this.size > 1) this.size -= 1;
    }

    toString(): string {
        return `[${this.tagName}:size=${this.size}:${this.buffer}]`;
    }
}

export function parseMarkdown(markdown: string): MarkdownToken[] {
    const content = markdown.trim() + '\n';

    const tokens: MarkdownToken[] = [];
    let node: Node = new Paragraph();

    for (const ch of content) {
        switch (ch) {
            case '\n':
                if (node.buffer.length > 0) {
                    tokens.push({node: node, value: node.buffer});
                }
                node = new Paragraph();
                break;
            case '#':
                if (node instanceof Title) {
                    node.decrementSize();
                } else {
                    node = new Title();
                }
                break;
            default:
                node.buffer += ch;
                break;
        }
    }

    return tokens;
}

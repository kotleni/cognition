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
    size: number = 3;

    decrementSize() {
        if (this.size > 1) this.size -= 1;
    }

    toString(): string {
        return `[${this.tagName}:size=${this.size}:${this.buffer}]`;
    }
}

class NewLine extends Node {
    tagName: string = 'newline';
}

class Link extends Node {
    tagName: string = 'link';
    label: string = '';
    url: string = '';

    saveLabel() {
        this.label = this.buffer;
        this.buffer = '';
    }

    saveUrl() {
        this.url = this.buffer;
        this.buffer = '';
    }

    toString(): string {
        return `[link:${this.label}:${this.url}]`;
    }
}

class Bold extends Node {
    tagName: string = 'bold';
}

class Italic extends Node {
    tagName: string = 'italic';
}

export function parseMarkdown(markdown: string): MarkdownToken[] {
    const content = markdown.trim() + '\n';

    const tokens: MarkdownToken[] = [];
    let node: Node = new Paragraph();
    let nodeStack: Node[] = [node];

    for (let i = 0; i < content.length; i++) {
        const ch = content[i];

        switch (ch) {
            case '\n':
                if (node.buffer.length > 0) {
                    tokens.push({node: node, value: node.buffer});
                }
                nodeStack = [new Paragraph()];
                node = nodeStack[0];
                tokens.push({node: new NewLine(), value: ''});
                break;
            case '#':
                if (node.buffer.length > 0) {
                    node.buffer += ch;
                    break;
                }
                if (node instanceof Title) {
                    node.decrementSize();
                } else {
                    node = new Title();
                    nodeStack = [node];
                }
                break;
            case '[':
                if (node.buffer.length > 0) {
                    tokens.push({node: node, value: node.buffer});
                }
                node = new Link();
                break;
            case ']':
                if (node instanceof Link) {
                    node.saveLabel();
                }
                break;
            case '(':
                if (!(node instanceof Link)) {
                    node.buffer += ch;
                }
                break;
            case ')':
                if (node instanceof Link) {
                    node.saveUrl();
                    tokens.push({node: node, value: node.buffer});
                    node = new Paragraph();
                } else {
                    node.buffer += ch;
                }
                break;
            case '*':
                if (content[i + 1] === '*') {
                    // Bold **
                    i++;
                    if (node instanceof Bold) {
                        tokens.push({node: node, value: node.buffer});
                        nodeStack.pop();
                        node = nodeStack[nodeStack.length - 1];
                    } else {
                        if (node.buffer.length > 0) {
                            tokens.push({node: node, value: node.buffer});
                        }
                        const boldNode = new Bold();
                        nodeStack.push(boldNode);
                        node = boldNode;
                    }
                } else {
                    // Italic *
                    if (node instanceof Italic) {
                        tokens.push({node: node, value: node.buffer});
                        nodeStack.pop();
                        node = nodeStack[nodeStack.length - 1];
                    } else {
                        if (node.buffer.length > 0) {
                            tokens.push({node: node, value: node.buffer});
                        }
                        const italicNode = new Italic();
                        nodeStack.push(italicNode);
                        node = italicNode;
                    }
                }
                break;
            default:
                node.buffer += ch;
                break;
        }
    }
    if (
        node.buffer.length > 0 &&
        !(node instanceof Paragraph && node.buffer.trim() === '')
    ) {
        tokens.push({node: node, value: node.buffer});
    }

    return tokens;
}

export type MarkdownToken = {
    node: Node;
    value: string;
};

export abstract class Node {
    abstract tagName: string;
    buffer: string = '';

    toString(): string {
        return `[${this.tagName}:${this.buffer}]`;
    }
}

export class Paragraph extends Node {
    tagName: string = 'paragraph';
}

export class Title extends Node {
    tagName: string = 'title';
    size: number = 3;

    decrementSize() {
        if (this.size > 1) this.size -= 1;
    }

    toString(): string {
        return `[${this.tagName}:size=${this.size}:${this.buffer}]`;
    }
}

export class NewLine extends Node {
    tagName: string = 'newline';
}

export class Link extends Node {
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

export class Bold extends Node {
    tagName: string = 'bold';
}

export class Italic extends Node {
    tagName: string = 'italic';
}

export class Code extends Node {
    tagName: string = 'code';
    language?: string;
    isBlock: boolean = false;

    toString(): string {
        if (this.isBlock) {
            return `[code-block:lang=${this.language || ''}:${this.buffer}]`;
        }
        return `[code-inline:${this.buffer}]`;
    }
}

export function parseMarkdown(markdown: string): MarkdownToken[] {
    const content = markdown.trim() + '\n';

    const tokens: MarkdownToken[] = [];
    let node: Node = new Paragraph();
    let nodeStack: Node[] = [node];

    for (let i = 0; i < content.length; i++) {
        const ch = content[i];
        const prevCh = content[i - 1];

        if (node instanceof Code && node.isBlock) {
            if (content.substring(i, i + 3) === '```') {
                tokens.push({node: node, value: node.buffer});
                node = new Paragraph();
                nodeStack = [node];
                i += 2;
            } else {
                node.buffer += ch;
            }
            continue;
        }

        switch (ch) {
            case '\n':
                if (node.buffer.length > 0) {
                    tokens.push({node: node, value: node.buffer});
                }
                nodeStack = [new Paragraph()];
                node = nodeStack[0];

                if (prevCh === '\n')
                    tokens.push({node: new NewLine(), value: ''});
                break;
            case '#':
                if (node instanceof Link) {
                    node.buffer += ch;
                    break;
                }

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
            case '`':
                if (content.substring(i, i + 3) === '```') {
                    if (node.buffer.length > 0) {
                        tokens.push({node: node, value: node.buffer});
                    }

                    const endOfLine = content.indexOf('\n', i);
                    const language = content.substring(i + 3, endOfLine).trim();

                    const codeNode = new Code();
                    codeNode.isBlock = true;
                    if (language) {
                        codeNode.language = language;
                    }
                    node = codeNode;
                    nodeStack = [node];
                    i = endOfLine;
                } else {
                    if (node instanceof Code && !node.isBlock) {
                        tokens.push({node: node, value: node.buffer});
                        nodeStack.pop();
                        node = nodeStack[nodeStack.length - 1];
                    } else {
                        if (node.buffer.length > 0) {
                            tokens.push({node: node, value: node.buffer});
                        }
                        const codeNode = new Code();
                        nodeStack.push(codeNode);
                        node = codeNode;
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

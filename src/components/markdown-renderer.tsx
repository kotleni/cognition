'use client';

import {
    Link as MDLink,
    MarkdownToken,
    parseMarkdown,
    Title,
    Code,
} from '@/markdown/parser';
import Link from 'next/link';
import React, {useMemo, useState} from 'react';
import {Switch} from './ui/switch';
import {Label} from './ui/label';

interface MarkdownRendererProps {
    markdown: string;
}

function compileMarkdownToReactComponents(
    tokens: MarkdownToken[],
): React.ReactNode[] {
    const nodes: React.ReactNode[] = [];
    let currentParagraphContent: React.ReactNode[] = [];

    const flushParagraph = (key: string | number) => {
        if (currentParagraphContent.length > 0) {
            nodes.push(<p key={`p-${key}`}>{currentParagraphContent}</p>);
            currentParagraphContent = [];
        }
    };

    tokens.forEach((token, index) => {
        const {node, value} = token;

        if (node.tagName === 'title' || node.tagName === 'newline') {
            flushParagraph(`pre-${index}`);
        }

        switch (node.tagName) {
            case 'title': {
                const size = (node as Title).size;
                let style = 'text-2xl';
                if (size === 2) style = 'text-xl';
                else if (size === 1) style = 'text-lg';

                nodes.push(
                    <p className={style} key={index}>
                        {value}
                    </p>,
                );
                break;
            }
            case 'paragraph':
                currentParagraphContent.push(<span key={index}>{value}</span>);
                break;

            case 'bold':
                currentParagraphContent.push(
                    <strong key={index}>{value}</strong>,
                );
                break;

            case 'italic':
                currentParagraphContent.push(<em key={index}>{value}</em>);
                break;

            case 'link': {
                const linkNode = node as MDLink;
                currentParagraphContent.push(
                    <Link
                        href={linkNode.url}
                        key={index}
                        className="text-blue-600 hover:underline"
                    >
                        {linkNode.label}
                    </Link>,
                );
                break;
            }
            case 'newline':
                currentParagraphContent.push(<br key={index} />);
                break;

            // TODO: Impl code hightlighting
            case 'code':
                currentParagraphContent.push(
                    <div key={index} className="rounded-b-lg bg-slate-900">
                        <code>{(node as Code).buffer}</code>
                    </div>,
                );
                break;

            default:
                if (value) {
                    currentParagraphContent.push(
                        <span key={index}>{value}</span>,
                    );
                }
                break;
        }
    });

    flushParagraph(tokens.length);

    return nodes;
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
    const [isRenderTokens, setIsRenderTokens] = useState(false);

    const markdownTokens = useMemo(
        () => parseMarkdown(props.markdown),
        [props.markdown],
    );

    const compiledNodes = useMemo(
        () => compileMarkdownToReactComponents(markdownTokens),
        [markdownTokens],
    );

    return (
        <div className="p-4 prose">
            <div className="flex items-center space-x-2">
                <Switch
                    id="debug-mode"
                    checked={isRenderTokens}
                    onCheckedChange={isChecked => {
                        setIsRenderTokens(isChecked);
                    }}
                />
                <Label htmlFor="debug-mode">Show markdown tokens</Label>
            </div>
            {isRenderTokens
                ? markdownTokens.map((token, index) => {
                      return <span key={index}>{token.node.toString()}</span>;
                  })
                : compiledNodes}
        </div>
    );
}

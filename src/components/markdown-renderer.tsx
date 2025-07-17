'use client';

import {
    Link as MDLink,
    MarkdownToken,
    parseMarkdown,
    Title,
} from '@/markdown/parser';
import Link from 'next/link';
import React, {useMemo} from 'react';

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
                const TitleComponent =
                    `h${3 - (node as Title).size || 1}` as React.ElementType;
                nodes.push(
                    <TitleComponent key={index}>{value}</TitleComponent>,
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
    const markdownTokens = useMemo(
        () => parseMarkdown(props.markdown),
        [props.markdown],
    );

    const compiledNodes = useMemo(
        () => compileMarkdownToReactComponents(markdownTokens),
        [markdownTokens],
    );

    return <div className="p-4 prose">{compiledNodes}</div>;
}

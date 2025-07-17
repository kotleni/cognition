'use client';

import {useState} from 'react';
import {LeftSide} from './left-side';
import {RightSide} from './right-side';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import {FilesManager} from './files-manager';
import {Separator} from '@/components/ui/separator';

interface MarkdownExample {
    name: string;
    url: string;
}

const markdownExamples: MarkdownExample[] = [
    {name: 'Basic', url: '/examples/basic.md'},
    {name: 'Code blocks', url: '/examples/code-blocks.md'},
];

export default function Home() {
    const [markdown, setMarkdown] = useState('');

    const loadExampleMarkdown = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }
            const text = await response.text();
            setMarkdown(text);
        } catch (error) {
            console.error('Error loading markdown example:', error);
        }
    };

    return (
        <div className="flex flex-col w-full h-full">
            <Menubar>
                <MenubarMenu>
                    <MenubarTrigger>Examples</MenubarTrigger>
                    <MenubarContent>
                        {markdownExamples.map((example, index) => {
                            return (
                                <MenubarItem
                                    key={index}
                                    onClick={() => {
                                        void loadExampleMarkdown(example.url);
                                    }}
                                >
                                    {example.name}
                                </MenubarItem>
                            );
                        })}
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>
            <div className="flex flex-row h-full">
                <FilesManager />
                <Separator orientation="vertical" />
                <LeftSide markdown={markdown} onMDChange={setMarkdown} />
                <Separator orientation="vertical" />
                <RightSide markdown={markdown} />
            </div>
        </div>
    );
}

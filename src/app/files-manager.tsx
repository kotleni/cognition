import {CirclePlus} from 'lucide-react';

interface MarkdownFile {
    name: string;
}

const files: MarkdownFile[] = [
    {name: 'base.md'},
    {name: 'election-list.md'},
    {name: 'nodejs-questions-1.md'},
];

interface FileItemProps {
    markdownFile: MarkdownFile;
}

function FileItem({markdownFile}: FileItemProps) {
    return (
        <div className="hover:bg-gray-900 hover:rounded-sm px-2 py-1 cursor-pointer">
            {markdownFile.name}
        </div>
    );
}

export function FilesManager() {
    return (
        <div className="flex flex-col gap-4 p-2 bg-black/30 w-140">
            <div className="flex flex-row gap-2 p-1">
                <CirclePlus
                    size={18}
                    className="hover:text-slate-400 cursor-pointer"
                />
            </div>
            {files.map(mdFile => (
                <FileItem key={mdFile.name} markdownFile={mdFile} />
            ))}
        </div>
    );
}

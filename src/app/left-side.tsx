import {MarkdownEditor} from '@/components/markdown-editor';
import {SideContainer} from './side-container';

interface LeftSideProps {
    markdown: string;
    onMDChange: (content: string) => void;
}

export function LeftSide({markdown, onMDChange}: LeftSideProps) {
    return (
        <SideContainer>
            <div className="w-full h-full pt-4 pl-4 pr-4">
                <MarkdownEditor value={markdown} onChange={onMDChange} />
            </div>
        </SideContainer>
    );
}

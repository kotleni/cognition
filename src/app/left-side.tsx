import {MarkdownEditor} from '@/components/markdown-editor';
import {SideContainer} from './side-container';

interface LeftSideProps {
    onMDChange: (content: string) => void;
}

export function LeftSide(props: LeftSideProps) {
    return (
        <SideContainer>
            <div className="w-full h-full pt-4 pl-4 pr-4">
                <MarkdownEditor onChange={props.onMDChange} />
            </div>
        </SideContainer>
    );
}

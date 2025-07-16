import {MarkdownRenderer} from '@/components/markdown-renderer';
import {SideContainer} from './side-container';

interface RightSideProps {
    markdown: string;
}

export function RightSide(props: RightSideProps) {
    return (
        <SideContainer>
            <MarkdownRenderer markdown={props.markdown} />
        </SideContainer>
    );
}

'use client';

import {useState} from 'react';
import {LeftSide} from './left-side';
import {RightSide} from './right-side';

export default function Home() {
    const [markdown, setMarkdown] = useState('');

    return (
        <div className="flex flex-row h-full">
            <LeftSide onMDChange={setMarkdown} />
            <RightSide markdown={markdown} />
        </div>
    );
}

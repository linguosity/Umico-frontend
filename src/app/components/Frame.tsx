import React from 'react';
import {Frame as FrameType} from '../types/frames';

interface FrameProps {
    frame: FrameType | null;
}

const Frame: React.FC<FrameProps> = ({frame}) => {
    return(
        <>
            <h1>Frame component</h1>
            {frame?.deadline}
        </>
       
    )
}

export default Frame;
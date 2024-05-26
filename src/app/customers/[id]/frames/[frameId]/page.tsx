'use client';

import EditFrame from "../../../../components/EditFrame";
import { Frame as FrameType } from "../../../../types/frames";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Frame from "../../../../components/Frame";
import { useCallback } from 'react';

const Page = ({ params }: { params: { id: string, frameId: string } }) => {
    const [id, setId] = useState<number | null>(null);
    const [frameId, setFrameId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [frame, setFrame] = useState<FrameType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Grab customer id 'id' parameter from URL path
    useEffect(() => {
        const parsedId = parseInt(params.id, 10);
        if (!isNaN(parsedId)) {
            setId(parsedId);
        } else {
            setId(null);
        }
    }, [params.id]);

    // Grab frame id 'frameId' parameter from URL path
    useEffect(() => {
        const parsedFrameId = parseInt(params.frameId, 10);
        if (!isNaN(parsedFrameId)) {
            setFrameId(parsedFrameId);
        } else {
            setFrameId(null);
        }
    }, [params.frameId]);

    // Check if edit mode is enabled
    useEffect(() => {
        const editMode = searchParams.get('editMode');
        setIsEditMode(editMode === 'true');
    }, [searchParams]);

    // Define fetchFrame using useCallback to prevent unnecessary re-definitions
    const fetchFrame = useCallback(async () => {
        if (id && frameId) {
            const response = await fetch(`http://127.0.0.1:8000/customers/${id}/frames/${frameId}/`);
            const frameData = await response.json();
            setFrame(frameData);
            console.log("Current frame data:", frameData);

        }
    }, [id, frameId]);

    // Call fetchFrame on component mount and when id, frameId, or isEditMode changes
    useEffect(() => {
        fetchFrame();
    }, [fetchFrame]);


    if (!frame) {
        return <div>Loading...</div>;
    }

    return isEditMode ? (
        <EditFrame key={frame.id} frame={frame} onRefresh={fetchFrame} />
    ) : (
        <Frame key={frame.id} frame={frame}/>
    );
};

export default Page;

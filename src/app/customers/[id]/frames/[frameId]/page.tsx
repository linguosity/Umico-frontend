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
            console.log("Customer id:", params.id);
            setId(parsedId);
        } else {
            setId(null);
        }
    }, [params.id]);

    // Grab frame id 'frameId' parameter from URL path
    useEffect(() => {
        const parsedFrameId = parseInt(params.frameId, 10);
        if (!isNaN(parsedFrameId)) {
            console.log("Frame id:", parsedFrameId);
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

    // Guidance by ChatGPT to implement fetchFrame with useCallback.
    const fetchFrame = useCallback(async () => {
        if (id && frameId) {
            console.log("Fetching frame for customer id:", id);
            console.log("Fetching frame with frame id:", frameId);

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/frames/${frameId}/`, {
                credentials: 'include',
                headers: {
                    "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
                  }
            });
            const frameData = await response.json();

            console.log("Fetched frame data:", frameData);
            setFrame(frameData);

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

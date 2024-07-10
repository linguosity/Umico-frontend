"use client";

import EditMisc from "../../../../components/EditMisc";
import { Misc as MiscType } from "../../../../types/misc";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Misc from "../../../../components/Misc";
import { useCallback } from 'react';

const MiscPage = ({ params }: { params: { id: string, miscId: string } }) => {
    const [id, setId] = useState<number | null>(null);
    const [miscId, setMiscId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [misc, setMisc] = useState<MiscType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const parsedId = parseInt(params.id, 10);
        if (!isNaN(parsedId)) {
            setId(parsedId);
        } else {
            setId(null);
        }
    }, [params.id]);

    useEffect(() => {
        const parsedMiscId = parseInt(params.miscId, 10);
        if (!isNaN(parsedMiscId)) {
            setMiscId(parsedMiscId);
        } else {
            setMiscId(null);
        }
    }, [params.miscId]);

    useEffect(() => {
        const editMode = searchParams.get('editMode');
        setIsEditMode(editMode === 'true');
    }, [searchParams]);

    // Guidance by ChatGPT to implement fetchMisc with useCallback.
    const fetchMisc = useCallback(async () => {
        if (id && miscId) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/misc/${miscId}/`, {
                credentials: 'include',
                headers: {
                    "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
                }
            });
            const miscData = await response.json();
            setMisc(miscData);
        }
    }, [id, miscId]);

    useEffect(() => {
        fetchMisc();
    }, [fetchMisc]);

    if (!misc) {
        return <div>Loading...</div>;
    }

    return isEditMode ? (
        <EditMisc key={misc.id} misc={misc} onRefresh={fetchMisc} />
    ) : (
        <Misc key={misc.id} misc={misc} />
    );
};

export default MiscPage;

"use client";

import EditScan from "../../../../components/EditScan";
import { Scan as ScanType } from "../../../../types/scan";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Scan from "../../../../components/Scan";
import { useCallback } from 'react';

const ScanPage = ({ params }: { params: { id: string, scanId: string } }) => {
    const [id, setId] = useState<number | null>(null);
    const [scanId, setScanId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [scan, setScan] = useState<ScanType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    
    console.log("customer id: ", id)
    console.log("scan id: ", scanId)
    
    useEffect(() => {
        const parsedId = parseInt(params.id, 10);
        if (!isNaN(parsedId)) {
            setId(parsedId);
        } else {
            setId(null);
        }
    }, [params.id]);

    useEffect(() => {
        const parsedScanId = parseInt(params.scanId, 10);
        if (!isNaN(parsedScanId)) {
            setScanId(parsedScanId);
        } else {
            setScanId(null);
        }
    }, [params.scanId]);

    useEffect(() => {
        const editMode = searchParams.get('editMode');
        setIsEditMode(editMode === 'true');
    }, [searchParams]);

    const fetchScan = useCallback(async () => {
        if (id && scanId) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/scans/${scanId}/`, {
                credentials: 'include'
            });
            const scanData = await response.json();
            setScan(scanData);
            console.log("Current scan data:", scanData);
        }
    }, [id, scanId]);

    useEffect(() => {
        fetchScan();
    }, [fetchScan]);

    if (!scan) {
        return <div>Loading...</div>;
    }

    return isEditMode ? (
        <EditScan key={scan.id} scan={scan} onRefresh={fetchScan} />
       
    ) : (
        <Scan key={scan.id} scan={scan}/> 
    )
};

export default ScanPage;

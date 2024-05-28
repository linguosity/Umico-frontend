"use client";

import EditPrint from "../../../../components/EditPrint";
import { Print as PrintType } from "../../../../types/print";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Print from "../../../../components/Print";
import { useCallback } from 'react';

const PrintPage = ({ params }: { params: { id: string, printId: string } }) => {
    const [id, setId] = useState<number | null>(null);
    const [printId, setPrintId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [print, setPrint] = useState<PrintType | null>(null);
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
        const parsedPrintId = parseInt(params.printId, 10);
        if (!isNaN(parsedPrintId)) {
            setPrintId(parsedPrintId);
        } else {
            setPrintId(null);
        }
    }, [params.printId]);

    useEffect(() => {
        const editMode = searchParams.get('editMode');
        setIsEditMode(editMode === 'true');
    }, [searchParams]);

    const fetchPrint = useCallback(async () => {
        if (id && printId) {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/prints/${printId}/`, {
                credentials: 'include'
            });
            const printData = await response.json();
            setPrint(printData);
            console.log("Current print data:", printData);
        }
    }, [id, printId]);

    useEffect(() => {
        fetchPrint();
    }, [fetchPrint]);

    if (!print) {
        return <div>Loading...</div>;
    }

    return isEditMode ? (
        <EditPrint key={print.id} print={print} onRefresh={fetchPrint} />
    ) : (
        <Print key={print.id} print={print}/>
    );
};

export default PrintPage;

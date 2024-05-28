"use client"

import { Scan } from '../types/scan';
import { useRouter } from 'next/navigation';

export const createScan = async (form: Scan, customerId: number, router: any) => {
    const URL = `http://127.0.0.1:8000/customers/${customerId}/add_scan/`;
    const URL_REDIRECT = `http://127.0.0.1:3000/customers/${customerId}`;

    const adjustedData = {
        ...form,
        customer: customerId,
    };

    try{
        console.log('Sending data:', adjustedData);
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Token 3ce57f1f41bb58e5ea2d8ff460f3409989311e2d"
            },
            credentials: 'include',
            body: JSON.stringify(adjustedData),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Failed to create the scan:', error);
        throw error;
    }
};

export const updateScan = async (form: Scan, id: number, scan_id: number) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/scans/${scan_id}/`;

    await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token 3ce57f1f41bb58e5ea2d8ff460f3409989311e2d"
        }, 
        credentials: 'include',
        body: JSON.stringify(form),
    });
};

export const deleteScan = async (scan_id: number, customerId: number, router: any) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}/delete_scan`;
    const URL_REDIRECT = `${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}`;
    
    try{
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }, 
            credentials: 'include',
            body: JSON.stringify({scan_id, customerId }),
        });

        if (response.ok) {
            console.log(URL_REDIRECT);
            router.push(URL_REDIRECT);
        } else {
            console.error("Failed to delete the scan");
        }
    } catch(error) {
        console.error("error", error);
    }
};

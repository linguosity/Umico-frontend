'use client'

import { Misc } from '../types/misc';
import { useRouter } from 'next/navigation';

export const createMisc = async (form: Misc, customerId: number, router: any) => {
   
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}/add_misc/`;
    const URL_REDIRECT = `${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}`;

    const adjustedData = {
        ...form,
        customer: customerId,
    };

    try {
        console.log('Sending data:', adjustedData);
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
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
        console.error('Failed to create the misc:', error);
        throw error;
    }
};

export const updateMisc = async (form: Misc, id: number, misc_id: number) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/customers/${id}/misc/${misc_id}/`;

    await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }, 
        credentials: 'include',
        body: JSON.stringify(form),
    });
};

export const deleteMisc = async (misc_id: number, customerId: number, router: any) => {
    
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/customers/${customerId}/delete_misc/`;
    const URL_REDIRECT = `${process.env.NEXT_PUBLIC_API_URL_REDIRECT}/customers/${customerId}`;

    try {
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
            }, 
            credentials: 'include',
            body: JSON.stringify({ misc_id, customerId }),
        });

        if (response.ok) {
            router.push(URL_REDIRECT);
        } else {
            console.error("Failed to delete the misc");
        }
    } catch(error) {
        console.error("error", error);
    }
};

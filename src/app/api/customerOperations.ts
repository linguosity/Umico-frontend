'use client'

import { Customer } from '../types/customer';
import { useRouter } from 'next/navigation';

export const createCustomer = async (form: Customer, router: any) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/customers/add_customer/`;
    console.log("data being sent:", form);
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
            },
            credentials: 'include',
            body: JSON.stringify(form),
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("this was sent back from backend: ", data)
        return data;

    } catch (error) {
        console.error('Failed to create the customer:', error);
        throw error;
    }
};

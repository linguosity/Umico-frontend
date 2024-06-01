"use client"

import { Customer } from '../types/customer';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

export const createCustomer = async (form: Customer, router: any) => {
    const URL = `${process.env.NEXT_PUBLIC_API_URL}/customers/add_customer/`;

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
        return data;

    } catch (error) {
        console.error('Failed to create the customer:', error);
        throw error;
    }
};


export const updateCustomer = async (form: Customer, router: any) => {
    const response = await fetch(`${API_URL}/customers/${form.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${API_TOKEN}`
        },
        credentials: 'include',
        body: JSON.stringify(form),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    router.push('/'); // Navigate to the customer list or wherever necessary
    return data;
};
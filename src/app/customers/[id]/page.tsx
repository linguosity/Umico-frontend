'use client';

import { useEffect, useState } from 'react';

const Page = ({ params }: { params: { id: string } }) => {

    const [id, setId] = useState<number | null>(null);

    useEffect(() => {
        const parsedId = parseInt(params.id, 10);
        if (!isNaN(parsedId)) {
        setId(parsedId);
        } else {
        setId(null);
        }
    }, [params.id]);


    //conditionally render page 
    const loadingCustomerDetails = <p>Loading...</p>;
    const loadedCustomerDetails = (
        <div>
        <h1>Edit</h1>
        <p>Customer ID: {id}</p>
        </div>
    );

    return id !== null ? loadedCustomerDetails : loadingCustomerDetails;
};

export default Page;

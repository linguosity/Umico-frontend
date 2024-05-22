'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Customer from '../../components/Customer';
import { Customer as CustomerType} from '../../types/customer'
import { Print } from '../../types/print'
import { Scan } from '../../types/scan'
import { Frame } from '../../types/frames'
import EditCustomer from '../../components/EditCustomer'

const Page = ({ params }: { params: { id: string } }) => {

    const [id, setId] = useState<number | null>(null);
    const searchParams = useSearchParams();
    const [user, setUser] = useState<CustomerType | null>(null);
    const [prints, setPrint] = useState<Print[] | null>(null);
    const [scans, setScan] = useState<Scan[] | null>(null);
    const [frames, setFrame] = useState<Frame[] | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    //grab customer 'Id' parameter from URL path
    useEffect(() => {
        const parsedId = parseInt(params.id, 10);
        if (!isNaN(parsedId)) {
            setId(parsedId);
        } else {
            setId(null);
        }
    }, [params.id]);


    useEffect(()=> {
        const editMode = searchParams.get('editMode');
        // This effect runs when `id` or `editMode` changes
        if (editMode === 'true') {
            setIsEditMode(true);
        } else {
            setIsEditMode(false);
        }
    },[searchParams]);

    useEffect(()=> {

        //fetch user data from Api
        const fetchUser = async() => {
            if(id){
                const response = await fetch(`http://127.0.0.1:8000/customers/${id}`);
                const customerData = await response.json();
                setUser(customerData);
                setScan(customerData.scans || null);
                setFrame(customerData.frames || null);
                setPrint(customerData.prints|| null);
                console.log(user, scans, frames, prints);
            }
        }

            fetchUser();

    }, [id]);

    if(!user) {
        return <div>Loading...</div>
    }

    const editCustomer= (
        <EditCustomer customerData={user}>

        </EditCustomer>
    )

    const viewCustomer = (
        <Customer customerData={user}  prints={prints} scans={scans} frames={frames}>
       
        </Customer>
    )

    return isEditMode ? editCustomer: viewCustomer;

};

export default Page;



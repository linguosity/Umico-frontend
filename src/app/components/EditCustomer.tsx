'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import { Customer } from '../types/customer';
import { Label, TextInput } from "flowbite-react";

interface EditCustomerProps {
    customerData: Customer;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ customerData }) => {
    return (
        <Card className="max-w-sm">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Edit Customer Details</h5>
            </div>

            <div className="flow-root">
                <div className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="small" value="First name" />
                        </div>
                        <TextInput id="small" type="text" sizing="sm" value={customerData.first_name}/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="small" value="First name" />
                        </div>
                        <TextInput id="small" type="text" sizing="sm" value={customerData.last_name}/>
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="email2" value="Email" />
                        </div>
                        <TextInput id="email2" type="email" placeholder={customerData.email} required shadow />
                    </div>
                    <div>
                        <div className="mb-2 block">
                        <Label htmlFor="small" value="Phone number" />
                        </div>
                        <TextInput id="small" type="text" sizing="sm" value={customerData.phone_number}/>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default EditCustomer;

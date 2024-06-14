'use client';

import { Card, Button } from 'flowbite-react';
import Image from 'next/image';
import { Customer } from '../types/customer';
import { Label, TextInput } from "flowbite-react";

interface EditCustomerProps {
    customerData: Customer;
}

const EditCustomer: React.FC<EditCustomerProps> = ({ customerData }) => {
    return (
        <Card>
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Edit Customer Details</h5>
            </div>
            <form>
                <div className="flow-root">
                    <div className="flex max-w-md flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="small" value="First name" />
                            </div>
                            <TextInput id="small" type="text" sizing="sm" defaultValue={customerData.first_name}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="small" value="First name" />
                            </div>
                            <TextInput id="small" type="text" sizing="sm" defaultValue={customerData.last_name}/>
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="email2" value="Email" />
                            </div>
                            <TextInput id="email2" type="email" defaultValue={customerData.email} required shadow />
                        </div>
                        <div>
                            <div className="mb-2 block">
                            <Label htmlFor="small" value="Phone number" />
                            </div>
                            <TextInput id="small" type="text" sizing="sm" defaultValue={customerData.phone_number}/>
                        </div>
                    </div>
                </div>
            <div className="grid grid-cols-2">
                <div></div>
                <div className="flex align-right">
                    <Button color="blue">Delete</Button>
                    <Button color="failure">Submit</Button>
                </div>
            </div>
            
            </form>
        </Card>
    );
};

export default EditCustomer;

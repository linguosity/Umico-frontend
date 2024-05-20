'use client';

import { Card } from 'flowbite-react';
import Image from 'next/image';
import { Customer } from '../types/customer';
import Link from 'next/link'

interface CustomerPageProps {
    customerData: Customer;
}

const CustomerPage: React.FC<CustomerPageProps> = ({ customerData }) => {
    return (
        <Card className="max-w-sm">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Customer Details</h5>
            </div>
            <div className="flow-root">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">

                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                    {customerData.first_name}
                                </p> 
                                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                                    {customerData.last_name}
                                </p>
                                
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                    {customerData.email}
                                </p>
                                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                                    {customerData.phone_number}
                                </p>
                                <Link href="?editMode=true">edit</Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </Card>
    );
};

export default CustomerPage;

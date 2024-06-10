// Import dependencies
import React from 'react';
import { NextPage } from 'next';
import {Card, ListGroup} from 'flowbite-react';
import { HiAdjustments, HiClipboardList, HiUserCircle, HiPlusCircle, HiUserRemove } from "react-icons/hi";
import { Customer } from '../types/customer';

// Define the component
interface CustomerCardProps {
    customer: Customer;
}

// Define the component
const CustomerCard: NextPage<CustomerCardProps> = ({customer}) => {
    return (
        <div className="grid grid-cols-3">
                <div>
                    <Card className='mb-4 relative'>
                        <div>
                            <div className="flex items-center space-x-4">
                                <div>
                                    <svg className="w-16 h-16 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                </div>
                                <div>
                                    <ul>
                                        <li>{customer.last_name}, {customer.first_name}</li>
                                        <li>{customer.email}</li>
                                        <li>{customer.phone_number}</li>
                                    </ul>
                                </div>
                            </div>
                            
                        </div>
                    </Card>
                </div>
                <div className="grid grid-cols-3">
                    <div className="flex items-center justify-left mb-4 mx-4">
                        <ListGroup className="w-24">
                            <ListGroup.Item icon={HiPlusCircle}><span className="text-gray-400">frame</span></ListGroup.Item>
                            <ListGroup.Item icon={HiPlusCircle}>print</ListGroup.Item>
                            <ListGroup.Item icon={HiPlusCircle}>scan</ListGroup.Item>,
                        
                        </ListGroup>
                    </div>
                    <div className="flex items-center justify-left mb-4">
                        <ListGroup className="w-16">
                            <ListGroup.Item icon={HiUserRemove}></ListGroup.Item>
                            <ListGroup.Item>
                                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="square" strokeLinejoin="round" strokeWidth="2" d="M7 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h1m4-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm7.441 1.559a1.907 1.907 0 0 1 0 2.698l-6.069 6.069L10 19l.674-3.372 6.07-6.07a1.907 1.907 0 0 1 2.697 0Z"/>
                                </svg>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div>
                        {/* 3rd empty column */}
                    </div>
                </div>
                <div>
                    {/* 3rd empty column */}
                </div>
            </div>
    );
};

// Export the component
export default CustomerCard;
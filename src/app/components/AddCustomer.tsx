'use client';

import { Customer, Address } from '../types/customer';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Select, Card, Button, Label, TextInput } from 'flowbite-react';
import { createCustomer } from '../api/customerOperations';
import { HiMail } from 'react-icons/hi';

interface EditCustomerProps {
    customer: Customer | null;
}

const usStates = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 
    'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 
    'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const AddCustomer: React.FC<EditCustomerProps> = ({ customer }) => {
    const newAddress: Address = {
        id: 0,
        customer: 0,
        street: '',
        city: '',
        state: '',
        zip_code: '',
        country: '',
    };

    const newCustomer: Customer = {
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        shipping_addresses: [newAddress],
    };

    const [form, setForm] = useState<Customer>(customer || newCustomer);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        if (['street', 'city', 'state', 'zip_code', 'country'].includes(name)) {
            setForm(prevForm => ({
                ...prevForm,
                shipping_addresses: [{ ...prevForm.shipping_addresses[0], [name]: newValue }]
            }));
        } else {
            setForm(prevForm => ({
                ...prevForm,
                [name]: newValue
            }));
        }
        console.log("Updated form state:", form);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            try {
                const customerData = {
                    ...form
                };
                console.log('Submitting form data:', JSON.stringify(customerData, null, 2));
                await createCustomer(customerData, router);
            } catch (error) {
                console.error('Failed to create the customer:', error);
            }
        }
    };

    return (
        <>
            <Card>
                <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
                    <div>
                        {/* First name */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="first_name" value="First Name" />
                            </div>
                            <TextInput name="first_name" id="first_name" placeholder="" required value={form.first_name} onChange={handleChange} />
                        </div>
                        {/* Last name */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="last_name" value="Last Name" />
                            </div>
                            <TextInput name="last_name" id="last_name" placeholder="" required value={form.last_name} onChange={handleChange} />
                        </div>
                        {/* Email */}
                        <div>
                            <div className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="email" value="Your Email" />
                                </div>
                                <TextInput id="email" name="email" type="email" icon={HiMail} placeholder="name@flowbite.com" required value={form.email} onChange={handleChange} />
                            </div>
                        </div>
                        {/* Phone number */}
                        <div>
                            <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number:</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 19 18">
                                        <path d="M18 13.446a3.02 3.02 0 0 0-.946-1.985l-1.4-1.4a3.054 3.054 0 0 0-4.218 0l-.7.7a.983.983 0 0 1-1.39 0l-2.1-2.1a.983.983 0 0 1 0-1.389l.7-.7a2.98 2.98 0 0 0 0-4.217l-1.4-1.4a2.824 2.824 0 0 0-4.218 0c-3.619 3.619-3 8.229 1.752 12.979C6.785 16.639 9.45 18 11.912 18a7.175 7.175 0 0 0 5.139-2.325A2.9 2.9 0 0 0 18 13.446Z"/>
                                    </svg>
                                </div>
                                <TextInput type="text" id="phone_number" name="phone_number" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="123-456-7890" required value={form.phone_number} onChange={handleChange} />
                            </div>
                            <p id="helper-text-explanation" className="mt-2 text-sm text-gray-500 dark:text-gray-400">Select a phone number that matches the format.</p>
                        </div>
                    </div>
                    <div>
                        {/* Street */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="street" value="Street" />
                            </div>
                            <TextInput name="street" id="street" placeholder="" required value={form.shipping_addresses[0]?.street || ''} onChange={handleChange} />
                        </div>
                        {/* City */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="city" value="City" />
                            </div>
                            <TextInput name="city" id="city" placeholder="" required value={form.shipping_addresses[0]?.city || ''} onChange={handleChange} />
                        </div>
                        {/* State */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="state" value="Select your state" />
                            </div>
                            <Select id="state" name="state" required value={form.shipping_addresses[0]?.state || ''} onChange={handleChange}>
                                <option value="" disabled>Select a state</option>
                                {usStates.map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </Select>
                        </div>
                        {/* Zip Code */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="zip_code" value="Zip Code" />
                            </div>
                            <TextInput id="zip_code" name="zip_code" placeholder="" required value={form.shipping_addresses[0]?.zip_code || ''} onChange={handleChange} />
                        </div>
                        {/* Country */}
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="country" value="Select your country" />
                            </div>
                            <Select id="country" name="country" required value={form.shipping_addresses[0]?.country || ''} onChange={handleChange}>
                                <option value="" disabled>Select a country</option>
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </Select>
                        </div>
                        
                        <Button type="submit" color="blue">Submit</Button>
                    </div>
                    
                </form>
            </Card>
        </>
    );
};

export default AddCustomer;

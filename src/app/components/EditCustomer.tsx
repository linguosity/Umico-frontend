'use client';

import { Card, Label, TextInput, Button, Select } from 'flowbite-react';
import React, { useState } from 'react';
import { Customer, Address } from '../types/customer';
import { updateCustomer } from '../api/customerOperations';
import { useRouter } from 'next/navigation';
import { HiMail } from 'react-icons/hi';

interface EditCustomerProps {
    customerData: Customer;
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

const EditCustomer: React.FC<EditCustomerProps> = ({ customerData }) => {
    const [form, setForm] = useState<Customer>(customerData);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            try {
                console.log('Submitting form data:', JSON.stringify(form, null, 2));
                await updateCustomer(form, router);
            } catch (error) {
                console.error('Failed to update the customer:', error);
            }
        }
    };

    return (
        <Card className="size-full">
            <div className="mb-4 flex items-center justify-between">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white"> Edit Customer Details</h5>
            </div>

            <form className="flow-root" onSubmit={handleSubmit}>
                <div className="flex max-w-md flex-col gap-4">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="first_name" value="First name" />
                        </div>
                        <TextInput id="first_name" name="first_name" type="text" sizing="sm" value={form.first_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="last_name" value="Last name" />
                        </div>
                        <TextInput id="last_name" name="last_name" type="text" sizing="sm" value={form.last_name} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput id="email" name="email" type="email" placeholder="name@flowbite.com" icon={HiMail} value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="phone_number" value="Phone number" />
                        </div>
                        <TextInput id="phone_number" name="phone_number" type="text" sizing="sm" value={form.phone_number} onChange={handleChange} required />
                    </div>
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
    );
};

export default EditCustomer;

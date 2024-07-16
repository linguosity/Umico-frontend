'use client';

import { useLoadScript, Autocomplete, Libraries } from '@react-google-maps/api';
import { Customer, Address } from '../types/customer';
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Select, Button, Label, TextInput } from 'flowbite-react';
import { createCustomer } from '../api/customerOperations';
import { HiMail, HiPhone } from 'react-icons/hi';

interface EditCustomerProps {
    customer: Customer | null;
}

interface AddCustomerProps extends EditCustomerProps {
    onSubmit: (customer: Customer) => void;
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

const libraries: Libraries = ['places'];

const useGoogleMapsScript = () => useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
});

const AddCustomer: React.FC<AddCustomerProps> = ({ customer, onSubmit }) => {
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
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
    const { isLoaded, loadError } = useGoogleMapsScript();

    const handlePlaceSelect = () => {
        const place = autocompleteRef.current?.getPlace();
        if (place && place.address_components) {
            const addressComponents = place.address_components;
            const streetNumber = addressComponents.find(component => component.types.includes('street_number'))?.long_name || '';
            const streetName = addressComponents.find(component => component.types.includes('route'))?.long_name || '';
            const city = addressComponents.find(component => component.types.includes('locality'))?.long_name || '';
            const state = addressComponents.find(component => component.types.includes('administrative_area_level_1'))?.short_name || '';
            const zipCode = addressComponents.find(component => component.types.includes('postal_code'))?.long_name || '';
            const country = addressComponents.find(component => component.types.includes('country'))?.long_name || '';

            setForm(prevForm => ({
                ...prevForm,
                shipping_addresses: [{
                    ...prevForm.shipping_addresses[0],
                    street: `${streetNumber} ${streetName}`.trim(),
                    city,
                    state,
                    zip_code: zipCode,
                    country,
                }],
            }));
        }
    };

    useEffect(() => {
        console.log('Script loaded:', isLoaded);
        console.log('Load error:', loadError);
      }, [isLoaded, loadError]);

    console.log('API Key:', process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

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
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            try {
                const customerData = {
                    ...form
                };
                console.log('Submitting form data:', JSON.stringify(customerData, null, 2));
                const newCustomer = await createCustomer(customerData, router);
                onSubmit(newCustomer);
            } catch (error) {
                console.error('Failed to create the customer:', error);
            }
        }
    };

    return (
        <form className="grid grid-cols-2 gap-8" onSubmit={handleSubmit}>
            <div>
                {/* First name */}
                <div>
                    <Label htmlFor="first_name" value="First Name" className="mb-2 block" />
                    <TextInput name="first_name" id="first_name" placeholder="" required value={form.first_name} onChange={handleChange} />
                </div>
                {/* Last name */}
                <div className="mt-4">
                    <Label htmlFor="last_name" value="Last Name" className="mb-2 block" />
                    <TextInput name="last_name" id="last_name" placeholder="" required value={form.last_name} onChange={handleChange} />
                </div>
                {/* Email */}
                <div className="mt-4">
                    <Label htmlFor="email" value="Your Email" className="mb-2 block" />
                    <TextInput 
                        id="email" 
                        name="email" 
                        type="email" 
                        icon={HiMail} 
                        placeholder="name@flowbite.com" 
                        required 
                        value={form.email} 
                        onChange={handleChange} 
                        style={{ paddingLeft: '2.5rem' }}
                    />
                </div>
                {/* Phone number */}
                <div className="mt-4">
                    <Label htmlFor="phone_number" value="Phone Number" className="mb-2 block" />
                    <TextInput 
                        type="text" 
                        id="phone_number" 
                        icon={HiPhone} 
                        name="phone_number" 
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" 
                        placeholder="123-456-7890" 
                        required 
                        value={form.phone_number} 
                        onChange={handleChange} 
                        style={{ paddingLeft: '2.5rem' }}
                    />
                    <p className="mt-2 text-sm text-gray-500">Format: xxx-xxx-xxxx</p>
                </div>
            </div>
            <div>
                {/* Street */}
                <div>
                    <Label htmlFor="street" value="Street" className="mb-2 block" />
                    {isLoaded && !loadError ? (
                        <Autocomplete
                            onLoad={(autocomplete) => { 
                            console.log('Autocomplete loaded');
                            autocompleteRef.current = autocomplete; 
                            }}
                            onPlaceChanged={handlePlaceSelect}
                        >
                            <TextInput
                                name="street"
                                id="street"
                                placeholder="Enter your address"
                                required
                                value={form.shipping_addresses[0]?.street || ''}
                                onChange={handleChange}
                            />
                        </Autocomplete>
                    ) : (
                        <>
                            {loadError && console.error('Error loading Google Maps script:', loadError)}
                            <TextInput
                                name="street"
                                id="street"
                                placeholder="Enter your address"
                                required
                                value={form.shipping_addresses[0]?.street || ''}
                                onChange={handleChange}
                            />
                        </>
                    )}
                </div>
                {/* City */}
                <div className="mt-4">
                    <Label htmlFor="city" value="City" className="mb-2 block" />
                    <TextInput name="city" id="city" placeholder="" required value={form.shipping_addresses[0]?.city || ''} onChange={handleChange} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {/* State */}
                    <div>
                        <Label htmlFor="state" value="State" className="mb-2 block" />
                        <Select id="state" name="state" required value={form.shipping_addresses[0]?.state || ''} onChange={handleChange}>
                            <option value="">Select a state</option>
                            {usStates.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </Select>
                    </div>
                    {/* Zip Code */}
                    <div>
                        <Label htmlFor="zip_code" value="Zip Code" className="mb-2 block" />
                        <TextInput id="zip_code" name="zip_code" placeholder="" required value={form.shipping_addresses[0]?.zip_code || ''} onChange={handleChange} />
                    </div>
                </div>
                {/* Country */}
                <div className="mt-4">
                    <Label htmlFor="country" value="Country" className="mb-2 block" />
                    <Select id="country" name="country" required value={form.shipping_addresses[0]?.country || ''} onChange={handleChange}>
                        <option value="">Select a country</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                    </Select>
                </div>
                <Button type="submit" color="blue" className="mt-4">Submit</Button>
            </div>
        </form>
    );
};

export default AddCustomer;
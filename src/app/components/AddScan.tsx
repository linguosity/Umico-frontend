'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Radio, Card, Label, FileInput, List, Checkbox, TextInput, Button, Datepicker } from 'flowbite-react';
import { Scan as ScanType } from '../types/scan';
import { createScan } from '../api/scanOperations';


// Guidance by ChatGPT to understand the TypeScript interface.
interface AddScanProps {
    id: number | null;
}

const AddScan: React.FC<AddScanProps> = ({ id }) => {
    const [form, setForm] = useState<Partial<ScanType>>({
        // Formatted date with ChatGPT's assistance for TypeScript compatibility.
        deadline: new Date().toISOString(),
        image_height: 0,
        image_width: 0,
        file_type: '',
        dpi: 0,
        thumbnail: 'https://dummyimage.com/50x50/000000/fff.png',
        is_completed: false,
        client_notified: false,
        notification_date: null,
        final_location: '',
        payment_type: '',
        deposit_made: false,
        balance_paid: false,
        job_notes: 'ipsum lorem'
    });
    
    const router = useRouter();

    // Guidance by ChatGPT to reconcile form inputs for API.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, type, value } = e.target;
        const newValue = (type === 'checkbox' || type === 'radio') && e.target instanceof HTMLInputElement ? (type === 'checkbox' ? e.target.checked : parseInt(value)) : value;
        setForm({
            ...form,
            [name]: newValue
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            try {
                // Guidance by ChatGPT to reconcile form inputs for API.
                const adjustedData = {
                    ...form,
                    deadline: form.deadline ? new Date(form.deadline).toISOString() : new Date().toISOString(),
                };

                await createScan(adjustedData as ScanType, id ?? 0, router);
                router.push(`/`);
            } catch (error) {
                console.error('Failed to create the scan:', error);
            }
        }
    };

    return (
        <div className="m-4 grid grid-flow-row auto-rows-max">
            <Card>
                <List horizontal>
                    <List.Item>
                        <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>
                    </List.Item>
                    <List.Item>
                        <h5>New Scan</h5>
                    </List.Item>
                </List>
            </Card>

            <form onSubmit={handleSubmit}>
                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Add Scan</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <div className="grid grid-cols-2">
                            <div className="relative w-full mb-5 group">
                                <Datepicker onChange={handleChange} datepicker-format="yyyy/MM/dd" value={form.deadline} name="deadline" id="deadline" className="block py-2.5 px-0 w-4/5 text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" required />
                                <Label htmlFor="deadline" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deadline</Label>
                            </div>
                            <div></div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Image dimensions:</span>
                                <div className="flex items-center space-x-1">
                                    <TextInput
                                    id="image_width"
                                    onChange={handleChange}
                                    name="image_width"
                                    value={form.image_width}
                                    type="number"
                                    placeholder="W"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                    />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                                    <TextInput
                                    id="image_height"
                                    onChange={handleChange}
                                    name="image_height"
                                    value={form.image_height}
                                    type="number"
                                    placeholder="H"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                    />
                                </div>
                            </div>
                            <div className="relative w-full mb-5 group">
                                <TextInput
                                id="file_type"
                                onChange={handleChange}
                                name="file_type"
                                value={form.file_type}
                                placeholder="File Type"
                                className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                required
                                />
                                <Label htmlFor="file_type" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">File Type</Label>
                            </div>
                            <div className="relative w-full mb-5 group">
                            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">DPI</h3>
                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-license" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                            <label htmlFor="horizontal-list-radio-license" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">300 </label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-id" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                            <label htmlFor="horizontal-list-radio-id" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">600</label>
                                        </div>
                                    </li>
                                    <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-military" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                            <label htmlFor="horizontal-list-radio-military" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">900</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-passport" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                            <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">1200</label>
                                        </div>
                                    </li>
                                    <li className="w-full dark:border-gray-600">
                                        <div className="flex items-center ps-3">
                                            <input id="horizontal-list-radio-passport" type="radio" value="" name="list-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                            <label htmlFor="horizontal-list-radio-passport" className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">1600</label>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div className="grid grid-cols-1 mb-16">
                            <div className="relative z-0 w-full mb-4 group">
                                <div id="fileUpload" className="max-w-md">
                                    <div className="mb-2 block">
                                        <Label htmlFor="thumbnail"/>
                                    </div>
                                    <FileInput id="thumbnail" onChange={handleChange} helperText="Upload" name="thumbnail"/>
                                </div>
                            </div>
                            <div className="flex">
                                <img src={form.thumbnail} width="35%" className="h-auto max-w-xs rounded-lg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="w-full grid grid-cols-2 gap-4 mb-24">
                        <div>
                            <fieldset>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="is_completed" onChange={handleChange} name="is_completed" checked={form.is_completed} />
                                        <Label htmlFor="is_completed">Completed</Label>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="client_notified" onChange={handleChange} name="client_notified" checked={form.client_notified} />
                                        <Label htmlFor="client_notified">Client Notified</Label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative z-0 w-full mb-5 group">
                            {/* final_location */}
                            <input type="text" onChange={handleChange}  name="final_location" id="final_location" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="final_location" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Final Location</Label>
                        </div>

                        <div className="relative z-0 w-full mb-5 group">
                                {/* payment_type */}
                                <input type="text" onChange={handleChange}  name="payment_type" id="floating_company" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <Label htmlFor="payment_type" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Payment Type</Label>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 w-full">
                        <div>
                            <div className="relative z-0 w-full mb-5 group">
                                <textarea onChange={handleChange} value={form.job_notes} name="job_notes" id="job_notes" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                <Label htmlFor="job_notes" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Notes</Label>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
                        </div>
                        <div>
                            <button type="button" onClick={() => router.back()} className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Back</button>
                        </div>
                    </div>
                    
                </div>
            </form>
        </div>
    );
}

export default AddScan;

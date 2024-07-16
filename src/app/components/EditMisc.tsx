'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, Checkbox, TextInput, Button, Datepicker } from 'flowbite-react';
import { Misc as MiscType } from '../types/misc';
import { updateMisc, deleteMisc } from '../api/miscOperations';
import CustomerCard from './CustomerCard';

interface EditMiscProps {
    misc: MiscType | null;
    onRefresh: () => Promise<void>;
}

const EditMisc: React.FC<EditMiscProps> = ({ misc, onRefresh }) => {
    const [form, setForm] = useState(misc);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, checked, value } = e.target as HTMLInputElement;
        setForm({
            ...form!,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            await updateMisc(form, misc?.customer.id ?? 0, misc?.id ?? 0);
            onRefresh();
            router.push(`${process.env.NEXT_PUBLIC_API_URL_REDIRECT}/customers/${misc?.customer.id}/misc/${misc?.id}`);
        }
    };

    useEffect(() => {
        console.log("Misc prop updated in child component:", misc);
    }, [misc]);

    return (
        <div className="m-4 grid grid-flow-row auto-rows-max">
            {misc?.customer && <CustomerCard customer={misc.customer} />}
            <form onSubmit={handleSubmit}>
                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900"><span className="text-blue-400">Edit</span> Misc</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div>
                        <div className="grid grid-cols-2">
                            <div className="relative w-full mb-5 group">
                                {/* deadline */}
                                <Datepicker onChange={handleChange} datepicker-format="yyyy/MM/dd" value={form?.deadline} name="deadline" id="deadline" className="block py-2.5 px-0 w-4/5 text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" required />
                                <Label htmlFor="deadline" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deadline</Label>
                            </div>
                            <div></div>
                            <div className="relative z-0 w-full mb-4 group">
                                <TextInput
                                    id="job_notes"
                                    onChange={handleChange}
                                    name="job_notes"
                                    value={form?.job_notes}
                                    placeholder="Job Notes"
                                    className="block w-full p-2.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                                <Label htmlFor="job_notes" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Notes</Label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="is_completed" onChange={handleChange} name="is_completed" defaultChecked={form?.is_completed} />
                        <Label htmlFor="is_completed">Completed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="client_notified" onChange={handleChange} name="client_notified" defaultChecked={form?.client_notified} />
                        <Label htmlFor="client_notified">Client Notified</Label>
                    </div>
                    <div className="relative w-full mb-5 group">
                        {/* notification_date */}
                        <Datepicker onChange={handleChange} datepicker-format="yyyy/MM/dd" value={form?.notification_date ?? ''} name="notification_date" id="notification_date" className="block py-2.5 px-0 w-4/5 text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" />
                        <Label htmlFor="notification_date" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Notification Date</Label>
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
                <div className="grid grid-cols-2 gap-4">
                    <div></div>
                    <div>
                        <button
                            type="button"
                            onClick={() => {
                                const customerId = misc?.customer?.id ?? 0;
                                const miscId = misc?.id ?? 0;
                                console.log(`Customer ${customerId} and misc ${miscId}`);
                                if (miscId && customerId) {
                                    deleteMisc(miscId, customerId, router);
                                }
                            }}
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditMisc;

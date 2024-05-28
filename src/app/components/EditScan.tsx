'use client'

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, List, Checkbox, Radio, TextInput, Button, Datepicker } from 'flowbite-react';
import { Scan as ScanType } from '../types/scan';
import { updateScan, deleteScan } from '../api/scanOperations';

interface EditScanProps {
    scan: ScanType | null;
    onRefresh: () => Promise<void>;
}

const EditScan: React.FC<EditScanProps> = ({ scan, onRefresh }) => {
    const [form, setForm] = useState(scan);
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
            await updateScan(form, scan?.customer.id ?? 0, scan?.id ?? 0);
            onRefresh();
            router.push(`${process.env.NEXT_PUBLIC_API_URL}/customers/${scan?.customer.id}/scans/${scan?.id}`);
        }
    };

    useEffect(() => {
        console.log("Scan prop updated in child component:", scan);
    }, [scan]);

    return (
        <div className="m-4 grid grid-flow-row auto-rows-max">
            <Card className="bg-amber-200">
                <List horizontal>
                    <List.Item>
                        <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>
                    </List.Item>
                    <List.Item>
                        <h5>Scan ID:</h5>
                    </List.Item>
                    <List.Item>
                        <h5>{scan?.id}</h5>
                    </List.Item>
                    <List.Item>
                        |
                    </List.Item>
                    <List.Item>
                        <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {scan?.customer.last_name}, {scan?.customer.first_name}
                        </h5>
                    </List.Item>
                    <List.Item>
                        <p className="font-regular text-gray-700 dark:text-gray-400">
                            {scan?.customer.phone_number}
                        </p>
                    </List.Item>
                    <List.Item>
                        <p className="font-regular text-gray-700 dark:text-gray-400">
                            {scan?.customer.email}
                        </p>
                    </List.Item>
                </List>
            </Card>

            <form onSubmit={handleSubmit}>
                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900"><span className="text-blue-400">Edit</span> Scan</span>
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
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Image dimensions:</span>
                                <div className="flex items-center space-x-1">
                                    {/* image_width */}
                                    <TextInput
                                    id="image_width"
                                    onChange={handleChange}
                                    name="image_width"
                                    value={form?.image_width}
                                    type="number"
                                    placeholder="W"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                    />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                                    {/* image_height */}
                                    <TextInput
                                    id="image_height"
                                    onChange={handleChange}
                                    name="image_height"
                                    value={form?.image_height}
                                    type="number"
                                    placeholder="H"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">DPI:</span>
                                <TextInput
                                    id="dpi"
                                    onChange={handleChange}
                                    name="dpi"
                                    value={form?.dpi}
                                    type="number"
                                    placeholder="DPI"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">File type:</span>
                                <TextInput
                                    id="file_type"
                                    onChange={handleChange}
                                    name="file_type"
                                    value={form?.file_type}
                                    type="text"
                                    placeholder="File Type"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <div className="grid grid-cols-1 mb-16">
                            <div className="relative z-0 w-full mb-4 group">
                                <div id="fileUpload" className="max-w-md">
                                    <div className="mb-2 block">
                                        {/* thumbnail */}
                                        <Label htmlFor="thumbnail"/>
                                    </div>
                                    <FileInput id="thumbnail" onChange={handleChange} helperText="Upload" name="thumbnail"/>
                                </div>
                            </div>
                            <div className="flex ">
                                <img src={form?.thumbnail} width="35%" className="h-auto max-w-xs rounded-lg" />
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
                                    const customerId = scan?.customer?.id ?? 0;
                                    const scanId = scan?.id ?? 0;
                                    if (scanId && customerId) {
                                        deleteScan(scanId, customerId, router);
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

export default EditScan;

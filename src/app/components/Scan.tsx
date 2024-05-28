import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, List, Checkbox, Radio, TextInput, Button, Datepicker } from 'flowbite-react';
import Link from 'next/link';
import { Scan as ScanType } from '../types/scan';

interface ScanProps {
    scan: ScanType | null;
}

const Scan: React.FC<ScanProps> = ({ scan }) => {
    const router = useRouter();

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
            <div className="w-full">
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Scanning</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
                <div>
                    <div className="grid grid-cols-2">
                        <div className="relative w-full mb-5 group">
                            <Datepicker readOnly datepicker-format="yyyy/MM/dd" data-date={scan?.deadline} value={scan?.deadline} name="deadline" id="deadline" className="block py-2.5 px-0 w-4/5 text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" required />
                            <Label htmlFor="deadline" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deadline</Label>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1">
                        <div className="relative z-0 w-full mb-4 group">
                            <div id="fileUpload" className="max-w-md">
                                <div className="mb-2 block">
                                    <Label htmlFor="thumbnail"/>
                                </div>
                                <FileInput id="thumbnail" readOnly helperText="Upload" name="thumbnail"/>
                            </div>
                        </div>
                        <div className="flex">
                            <img src={scan?.thumbnail} width="35%" className="h-auto max-w-xs rounded-lg" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Image dimensions:</span>
                    <div className="flex items-center space-x-1">
                        <TextInput
                            id="image_width"
                            readOnly
                            name="image_width"
                            value={scan?.image_width}
                            type="number"
                            placeholder="W"
                            className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                        <TextInput
                            id="image_height"
                            readOnly
                            name="image_height"
                            value={scan?.image_height}
                            type="number"
                            placeholder="H"
                            className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                        />
                    </div>
                </div>
                <div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">DPI:</span>
                        <TextInput
                            name="dpi"
                            readOnly
                            value={scan?.dpi}
                            id="dpi"
                            type="number"
                            placeholder="DPI"
                            className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">File type:</span>
                    <TextInput
                        name="file_type"
                        readOnly
                        value={scan?.file_type}
                        id="file_type"
                        type="text"
                        placeholder="File Type"
                        className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
                <div className="relative z-0 w-full mb-6 group">
                    <Checkbox id="is_completed" name="is_completed" defaultChecked={scan?.is_completed} readOnly />
                    <Label htmlFor="is_completed" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Completed</Label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <Checkbox id="client_notified" name="client_notified" defaultChecked={scan?.client_notified} readOnly />
                    <Label htmlFor="client_notified" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Client Notified</Label>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
                <div className="relative z-0 w-full mb-5 group">
                    <Datepicker readOnly datepicker-format="yyyy/MM/dd" data-date={scan?.notification_date} name="notification_date" id="notification_date" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" required />
                    <Label htmlFor="notification_date" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Notification Date</Label>
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <TextInput readOnly name="notes" value={scan?.job_notes} id="notes" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <Label htmlFor="notes" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Notes</Label>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <button type="button" onClick={() => router.back()} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Back</button>
                </div>
                <div>
                <Link href="?editMode=true">
                    <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Edit </button>
                </Link>
                </div>
            </div>   
        </div>
    );
};

export default Scan;

'use client'

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, List, Checkbox, Radio, TextInput, Button, Datepicker} from 'flowbite-react';
import { Print as PrintType } from '../types/print';
import { updatePrint, deletePrint } from '../api/printOperations';

interface EditPrintProps {
    print: PrintType | null;
    onRefresh: () => Promise<void>;
}

const EditPrint: React.FC<EditPrintProps> = ({ print, onRefresh }) => {
    const [form, setForm] = useState(print);
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
        if(form){
            await updatePrint(form, print?.customer.id ?? 0, print?.id ?? 0);
            onRefresh();
            router.push(`${process.env.NEXT_PUBLIC_API_URL}/customers/${print?.customer.id}/prints/${print?.id}`);
        }
    }

    useEffect(() => {
        console.log("Print prop updated in child component:", print);
    }, [print]);

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
                        <h5>Print ID:</h5>
                    </List.Item>
                    <List.Item>
                        <h5>{print?.id}</h5>
                    </List.Item>
                    <List.Item>
                        |
                    </List.Item>
                    <List.Item>
                        <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {print?.customer.last_name}, {print?.customer.first_name}
                        </h5>
                    </List.Item>
                    <List.Item>
                        <p className="font-regular text-gray-700 dark:text-gray-400">
                            {print?.customer.phone_number}
                        </p>
                    </List.Item>
                    <List.Item>
                        <p className="font-regular text-gray-700 dark:text-gray-400">
                            {print?.customer.email}
                        </p>
                    </List.Item>
                </List>
            </Card>

            <form onSubmit={handleSubmit}>
                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900"><span className="text-blue-400">Edit</span> Print</span>
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
                                <span className="text-sm font-medium text-gray-900 dark:text-white">Paper dimensions:</span>
                                <div className="flex items-center space-x-1">
                                    {/* paper_width */}
                                    <TextInput
                                    id="paper_width"
                                    onChange={handleChange}
                                    name="paper_width"
                                    value={form?.paper_width}
                                    type="number"
                                    placeholder="W"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                    />
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                                    {/* paper_height */}
                                    <TextInput
                                    id="paper_height"
                                    onChange={handleChange}
                                    name="paper_height"
                                    value={form?.paper_height}
                                    type="number"
                                    placeholder="H"
                                    className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                    />
                                </div>
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
                <div>
                    <div className="w-full grid grid-cols-2 gap-4 mb-24">
                        <div>
                            {/* print_style */}
                            <fieldset>
                                <div className="grid grid-cols-1 gap-4" id="checkbox">
                                    <div><h1>Print style</h1></div>
                                    <div className="group">
                                        <Radio id="print_style_border" onChange={handleChange} value="border" name="print_style" defaultChecked={form?.print_style === 'border'} />
                                        <Label htmlFor="print_style_border">Border</Label>
                                    </div>
                                    <div className="group">
                                        <Radio id="print_style_full_bleed" onChange={handleChange} value="full_bleed" name="print_style" defaultChecked={form?.print_style === 'full_bleed'} />
                                        <Label htmlFor="print_style_full_bleed">Full Bleed</Label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div>
                            <h1>quantity</h1>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                {/* quantity */}
                                <input type="number" id="quantity" onChange={handleChange} name="quantity" value={form?.quantity} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 w-full">
                        <div>
                            <div className="relative z-0 w-full mb-5 group">
                                {/* job_notes */}
                                <textarea onChange={handleChange} value={form?.job_notes} name="job_notes" id="job_notes" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
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
                    <div className="grid grid-cols-2 gap-4">
                        <div></div>
                        <div>
                        <button
                                type="button"
                                onClick={() => {
                                    console.log("print id", print?.id);
                                    console.log("print customer id", print?.customer.id);
                                    const customerId = print?.customer?.id ?? 0;
                                    const printId = print?.id ?? 0;
                                    if (printId && customerId) {
                                        deletePrint(printId, customerId, router);
                                    }
                                }}
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditPrint;

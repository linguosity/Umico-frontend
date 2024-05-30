'use client'

import React, { useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, List, Checkbox, Radio, TextInput, Datepicker} from 'flowbite-react';
import { Frame as FrameType } from '../types/frames';
import { createFrame } from '../api/frameOperations';
import { data } from 'autoprefixer';


// Guidance by ChatGPT to understand the TypeScript interface.
interface EditFrameProps {
    id: number | null;
}

// Applied TypeScript with ChatGPT's help for the React component.
const AddFrame: React.FC<EditFrameProps> = ({ id }) => {
    // Initializing state with default values for required fields
    const [form, setForm] = useState<Partial<FrameType>>({
        id: 0, // Assuming a temporary default ID
        // Formatted date with ChatGPT's assistance for TypeScript compatibility.
        deadline: new Date().toISOString(), // Set to current date-time as default
        // Formatted date with ChatGPT's assistance for TypeScript compatibility.
        created_at: new Date().toISOString(), // Set to current date-time
        image_height: 0,
        image_width: 0,
        frame_height: 0,
        frame_width: 0,
        moulding: '',
        moulding_number: BigInt("0"),
        mat: '',
        mat_number: BigInt("0"),
        mat_ply: '4-ply',
        mat_window: false,
        mat_double: false,
        mat_in_visible: 0,
        mat_in_total: 0,
        mat_inside_height: 0,
        mat_inside_width: 0,
        mat_outside_height: 0,
        mat_outside_width: 0,
        float_type: 'raised',
        float_in_visible: 0,
        float_in_total: 0,
        glazing: '',
        thumbnail: 'https://dummyimage.com/50x50/000000/fff.png', // Provide a default value
        glazing_type: '',
        spacers: false,
        spacers_type: '',
        canvas_floater: 0,
        straight_to_frame: false,
        art_location: '',
        art_condition: '',
        is_completed: false,
        client_notified: false,
        notification_date: null,
        final_location: '',
        payment_type: '',
        deposit: false,
        balance_paid: false,
    });
    
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setForm({
            ...form!,
            [name]: type === 'checkbox' ? checked : value
        });
        
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form) {
            try {
                // Guidance by ChatGPT to reconcile form inputs for API.
                const adjustedData = {
                    ...form,
                    spacers: form.spacers === true, // Ensure spacers is a boolean
                    notification_date: form.notification_date ? new Date(form.notification_date).toISOString() : null, // Format date correctly
                    deadline: form.deadline ? new Date(form.deadline).toISOString() : "",// Format deadline correctly
                };

                // Remove customer property as it will be sent separately
                const { customer, ...dataWithoutCustomer } = adjustedData;
                console.log("customer", customer);
                console.log("data without customer", dataWithoutCustomer);

                await createFrame(dataWithoutCustomer as FrameType, id ?? 0, router);
                router.push('/'); // Reload the page
            } catch (error) {
                console.error('Failed to create the frame:', error);
            }
        }
    };


    return(
        <div className="m-4 grid grid-flow-row auto-rows-max">

            <Card className="bg-amber-50 mb-4">
                <List horizontal>
                    <List.Item>
                        <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                        </svg>
                    </List.Item>
                    <List.Item>
                        <h5>New Frame</h5>
                    </List.Item>
                </List>
            </Card>
           
            <form onSubmit={handleSubmit} method="POST">
            
            <div className="grid grid-cols-2 gap-4 m-4">
                <div>
                    <div className="grid grid-cols-2">
                        
                        <div className="relative w-full mb-5 group">
                            {/* deadline */}
                            <Datepicker onChange={handleChange} datepicker-format="yyyy/MM/dd"  name="deadline" id="deadline" className="block py-2.5 px-0 w-4/5 text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" required />
                            <Label htmlFor="deadline" className="peer-focus:font-medium text-xs text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deadline</Label>
                        </div>
                                   
                        <div>
                            {/* number_orders PENDING DATABASE ADDITION 
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                <input type="text" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                </button>
                            </div>*/}
                        </div>
                        <div></div>
                        <div></div>
                        <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Image dimensions:</span>
                            <div className="flex items-center space-x-1">
                                {/* image_width */}
                                <TextInput
                                id="image_width"
                                onChange={handleChange}
                                name="image_width"
                                
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
                                type="number"
                                placeholder="H"
                                className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                            </div>
                        </div>
                        <div></div>
                        <div>
                            <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Frame dimensions:</span>
                            <div className="flex items-center space-x-1">
                                {/* frame_width */}
                                <TextInput
                                name="frame_width"
                                onChange={handleChange}
                                id="width"
                                type="number"
                                placeholder="W"
                                className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                                {/* frame_height */}
                                <TextInput
                                name="frame_height"
                                onChange={handleChange}
                                id="height"
                                type="number"
                                placeholder="H"
                                className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1">
                        <div className="relative z-0 w-full mb-4 group">
                            <div id="fileUpload" className="max-w-md">
                                <div className="mb-2 block">
                                    {/* thumbnail */}
                                    <Label htmlFor="thumbnail"/>
                                </div>
                                <FileInput id="thumbnail" onChange={handleChange}  helperText="Upload" name="thumbnail"/>
                            </div>
                        </div>
                        <div className="flex ">
                            <img src="" width="35%" className="h-auto max-w-xs rounded-lg" />
                        </div>
                    </div>
                </div>
                
                <div>
                   
                </div>
                <div>
                    
                </div>
                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Mat</span>
                    </div>
                </div>
                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Float</span>
                    </div>
                </div>
                <div> 
                    <div className="grid grid-cols-2">
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* moulding */}
                            <input type="text" name="moulding"  onChange={handleChange} id="moulding" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="moulding" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">moulding</Label>
                        </div>
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* moulding_number */}
                            <input type="number" name="moulding_number" onChange={handleChange} id="moulding_number" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="moulding_number" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">#</Label>
                        </div>
                    </div>
                </div>
                <div className="w-full grid grid-cols-3 gap-4">
                    <div>
                        {/* float_type */}
                        <fieldset >
                            <div className="grid grid-cols-1 gap-4" id="checkbox">
                                <div className="group">
                                    <Radio id="float_type_float" onChange={handleChange} name="float_type" defaultChecked/>
                                    <Label htmlFor="float_type_float">float</Label>
                                </div>
                                <div className="group">
                                    <Radio id="float_type_raised" onChange={handleChange} name="raised"/>
                                    <Label htmlFor="float_type_raised">raised</Label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                    <div>
                        <div>
                           
                                <label htmlFor="quantity-input" className="block mb-2 text-xs text-gray-900 dark:text-white">in. visible</label>
                                <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                    {/* float_in_visible */}
                                    <input type="text" id="float_in_visible" onChange={handleChange} name="float_in_visible"  data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                    <button type="button" id="increment-button" data-input-counter-increment="float_in_visible" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                           
                        </div>
                    </div>
                    <div>
                            <label htmlFor="quantity-input" className="block mb-2 text-xs text-gray-900 dark:text-white">in. total</label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>

                                {/* float_in_total */}
                                <input type="text" id="float_in_total" onChange={handleChange} name="float_in_total" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                            </div>
                        
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2">
                        
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* mat */}
                            <input type="text" name="mat" id="mat" onChange={handleChange}  className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="mat" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">mat</Label>
                        </div>
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* mat_number */}
                            <input type="number" name="mat_number" onChange={handleChange}  id="mat_number" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="mat_number" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">#</Label>
                        </div>
                    </div>
                </div>
                <div></div>
                <div>
                    <div className="grid grid-cols-2">
                        <div className="grid grid-cols-2">
                            <div className="grid grid-cols-1 gap-4" id="checkbox">
                                <fieldset>
                                    <div className="group mb-4">
                                        {/* mat_ply */}
                                        <Radio id="mat_ply_4" onChange={handleChange} name="mat_ply" defaultChecked/>
                                        <Label htmlFor="mat_ply_4">4-ply</Label>
                                    </div>
                                    <div className="group">
                                         {/* mat_ply */}
                                        <Radio id="mat_ply_8" onChange={handleChange} name="mat_ply" />
                                        <Label htmlFor="mat_ply_8">8-ply</Label>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="grid grid-cols-1 gap-8" id="checkbox">
                                <fieldset>
                                    <div className="group mb-4">
                                         {/* mat_window */}
                                         <Checkbox id="mat_window" onChange={handleChange}  name="mat_window" />
                                        <Label htmlFor="mat_window">window</Label>
                                    </div>
                                    <div className="group gap-2">
                                         {/* mat_double */}
                                         <Checkbox id="mat_double" onChange={handleChange}  name="mat_double"/>
                                        <Label htmlFor="mat_double">double mat</Label>
                                    </div>
                                </fieldset>
                            </div>
                            </div>
                        <div>
                        <div>
                        <div>
                        <div>
                                <label htmlFor="quantity-input" className="block mb-2 text-xs text-gray-900 dark:text-white">in. visible</label>
                                <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                    {/* mat_in_visible */}
                                    <input type="number" id="mat_in_visible" onChange={handleChange} name="mat_in_visible" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                    <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            
                        </div>
                    </div>
                    <div>
                            <label htmlFor="quantity-input" className="block mb-2 text-xs text-gray-900 dark:text-white">in. total</label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                {/* mat_in_total */}
                                <input type="text" id="mat_in_total" onChange={handleChange}  name="mat_in_total" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                </button>
                            </div>
                        
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
                <div></div>
                <div className="grid grid-cols-3 w-full">
                    <div>
                        <label htmlFor="quantity-input" className="block mb-8 text-xs font-medium text-gray-900 dark:text-white">inside dimensions</label>
                        <label htmlFor="quantity-input" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">outside dimensions</label>
                    </div>

                    <div>
                    <div>
                                
                                <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                    {/* mat_inside_height */}
                                    <input type="text" id="mat_inside_height" onChange={handleChange}  name="mat_inside_height" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                                    <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            
                        </div>
                        <div>
                                <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                    {/* mat_outside_width */}
                                    <input type="text" id="mat_inside_width" onChange={handleChange} name="mat_inside_width" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                                    <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                            
                        </div>
                    </div>
                    
                    <div>
                        <div>
                                <div className="relative flex items-center max-w-[8rem]">
                                    <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                        </svg>
                                    </button>

                                    {/* mat_outside_height */}
                                    <input type="text" id="mat_outside_height" onChange={handleChange} name="mat_outside_height" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                                    <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                                </div>
                        </div>
                    <div>
                    <div>
                            <label htmlFor="quantity-input" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"></label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                {/* mat_outside_width */}
                                <input type="text" id="mat_outside_width" onChange={handleChange} name="mat_outside_width" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                            </div>
                       
                    </div>
                </div>
            </div>
                </div>
            
                <div className="w-full grid grid-cols-3 gap-4">
                    
                </div>

                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Glazing</span>
                    </div>
                </div>
                <div className="w-full">
                    <div className="inline-flex items-center justify-center w-full">
                        <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Spacers</span>
                    </div>
                </div>

                <div>
                    <div className="">

                        <fieldset>
                            <div className="grid grid-cols-2 gap-4" id="checkbox">
                                <div className="group">
                                    {/* glazing */}
                                    <Radio id="glazing_glass" onChange={handleChange} name="glazing"/>
                                    <Label htmlFor="glazing_glass">Glass</Label>
                                </div>
                                <div className="group">
                                    <Radio id="glazing_plexi" onChange={handleChange} name="glazing" />
                                    <Label htmlFor="glazing_plexi">Plexiglass</Label>
                                </div>
                            </div>
                        </fieldset>

                        <ul className="items-center w-full text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    {/* glazing_type */}
                                    <input id="premium_clear" onChange={handleChange} value='pc' name="glazing_type" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="premium_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Premium Clear </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="conservation_clear" onChange={handleChange} value='cc' type="radio"  name="glazing_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="conservation_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Conservation Clear</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="museum" type="radio" onChange={handleChange} value='m' name="glazing_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="museum" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Museum</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="">
                        <fieldset>
                        <div className="grid grid-cols-2 gap-4" id="checkbox">
                            <div className="group">
                                {/* spacers */}
                                <Radio id="spacers_true" onChange={handleChange} name="spacers" value="true"/>
                                <Label htmlFor="spacers_true">Yes</Label>
                            </div>
                            <div className="group">
                                <Radio id="spacers_false" onChange={handleChange} name="spacers" value="false" />
                                <Label htmlFor="spacers_false">No</Label>
                            </div>
                        </div>
                        </fieldset>

                        <ul className="items-center w-full text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    {/* spacers_type */}
                                    <input id="spacers_clear" onChange={handleChange} type="radio" value='c' name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="spacers_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">clear </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="spacers_white" onChange={handleChange} type="radio" value='w'  name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="spacers_white" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">white</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="spacers_match" onChange={handleChange} type="radio" value='m'  name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="spacers_match" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">match</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
               
            </div>
            <div className="w-full">
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Canvas Floater</span>
                </div>
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <div>
                            <label htmlFor="quantity-input" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white"></label>
                            <div className="relative flex items-center max-w-[8rem]">
                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                    <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                    </svg>
                                </button>
                                {/* canvas_floater */}
                                <input type="text" id="canvas_floater" onChange={handleChange} name="canvas_floater" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="flex-shrink-0 bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 inline-flex items-center justify-center border border-gray-300 rounded-md h-5 w-5 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none">
                                        <svg className="w-2.5 h-2.5 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16"/>
                                        </svg>
                                    </button>
                            </div>
                    
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        {/* straight_to_frame */}
                        <Checkbox id="straight_to_frame" onChange={handleChange} name="straight_to_frame"/>
                        <Label htmlFor="straight_to_frame">straight to frame</Label>
                    </div>
                </div>
            </div>
            
            <div className="w-full">
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Job Notes</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-8 m-8 w-full">
                <div>
                    
                    <div className="relative z-0 w-full mb-5 group">
                        {/* art_location */}
                        <input type="text" onChange={handleChange} name="art_location" id="art_location" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="art_location" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Location</Label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        {/* artwork_condition */}
                        <input type="text" onChange={handleChange} name="art_condition" id="art_condition" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="art_condition" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Condition</Label>
                    </div>
                   
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="grid grid-cols-2 gap-8" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                {/* is_completed */}
                                <Checkbox id="is_completed" onChange={handleChange}  name="is_completed"/>
                                <Label htmlFor="is_completed">Completed</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* client_notified */}
                                <Checkbox id="client_notified" onChange={handleChange} name="client_notified" />
                                <Label htmlFor="client_notified">Notified</Label>
                            </div>
                            {/* notification_date */}
                            <Datepicker onChange={handleChange} name="notification_date" datepicker-format="yyyy/MM/dd"/>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div>
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
                    <div className="grid grid-cols-2 gap-4" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                {/* deposit */}
                                <Checkbox id="deposit" onChange={handleChange} name="deposit" />
                                <Label htmlFor="deposit">balance paid</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* balance_paid */}
                                <Checkbox id="balance_paid" onChange={handleChange} name="balance_paid" />
                                <Label htmlFor="balance_paid">deposit</Label>
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
                    <div>
                        
                    </div>
                    <div>
                        <button 
                            type="button" 
                        
                            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                            Delete
                        </button>
                    </div>

                </div>   
                
            </div>
            </form>
            
        </div>
    )
}

export default AddFrame;
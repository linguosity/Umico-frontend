'use client'

import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, List, Checkbox, Radio, TextInput, Button, Datepicker} from 'flowbite-react';
import Image from 'next/image'
import { Frame as FrameType } from '../types/frames';
import { updateFrame, deleteFrame } from '../api/frameOperations';
import CustomerCard from '../components/CustomerCard';

interface EditFrameProps {
    frame: FrameType | null;
    onRefresh: () => Promise<void>; // Define the type of the onRefresh function
}


const EditFrame: React.FC<EditFrameProps> = ({ frame, onRefresh }) => {
    const [form, setForm] = useState(frame);
    const router = useRouter(); // Initialize useRouter
    console.log("here's the frame", frame);

    useEffect(() => {
        console.log("Frame prop updated in child component:", frame);
        setForm(frame);
    }, [frame]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, checked, value } = e.target;
        setForm((prevForm) => prevForm ? {
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value
        } : prevForm);
    };
    // This adds a null check for `form` to ensure it's not undefined before updating its state.
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if(form){
            //pass update function frame id and customer id to frameOperation
            
            await updateFrame(form, frame?.customer.id ?? 0, frame?.id ?? 0);
            onRefresh();  // Refresh frame data after update
            router.push(`${process.env.NEXT_PUBLIC_API_URL_REDIRECT}/customers/${frame?.customer.id}/frames/${frame?.id}`)
        }
    }

    
    return(
        <div className="m-4 grid grid-flow-row auto-rows-max">

            {frame?.customer && <CustomerCard customer={frame.customer} />}

            <form onSubmit={handleSubmit}>
            <div className="w-full">
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900"><span className="text-blue-400">Edit</span> Framing</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
                <div>
                    <div className="grid grid-cols-2">
                        
                        <div className="relative w-full mb-5 group">
                            {/* deadline */}
                            <Datepicker onChange={handleChange} datepicker-format="yyyy/MM/dd" value={form?.deadline} name="deadline" id="deadline" className="block py-2.5 px-0 w-4/5 text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" required />
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
                                    value={form?.image_width?.toString() || ''}
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
                                    value={form?.image_height?.toString() || ''}
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
                                value={form?.frame_width}
                                id="width"
                                type="number"
                                placeholder="W"
                                className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                                {/* frame_height */}
                                <TextInput
                                name="frame_height"
                                value={form?.frame_height}
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
                            <img src={form?.thumbnail} width="35%" className="h-auto max-w-xs rounded-lg" />
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
                            <input type="text" name="moulding" value={form?.moulding} onChange={handleChange} id="moulding" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="moulding" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">moulding</Label>
                        </div>
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* moulding_number */}
                            <input 
                                type="number" 
                                name="moulding_number" 
                                value={form?.moulding_number ? form.moulding_number.toString() : ''} 
                                onChange={handleChange} 
                                id="moulding_number" 
                                className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required 
                            />
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
                                    <Radio id="float_type_float" onChange={handleChange} value='float'  name="float_type" defaultChecked={form?.float_type === 'float'}/>
                                    <Label htmlFor="float_type_float">float</Label>
                                </div>
                                <div className="group">
                                    <Radio id="float_type_raised" onChange={handleChange} value='raised' name="raised" defaultChecked={form?.float_type === 'raised'}/>
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
                                    <input type="text" id="float_in_visible" onChange={handleChange} name="float_in_visible" value={form?.float_in_visible} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                                <input type="text" id="float_in_total" onChange={handleChange} name="float_in_total" value={form?.float_in_total} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                            <input 
                                type="text" 
                                name="mat" 
                                id="mat" 
                                onChange={handleChange} 
                                value={form?.mat} 
                                className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                required 
                            />
                            <Label htmlFor="mat" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">mat</Label>
                        </div>
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* mat_number */}
                            <input 
                                type="number" 
                                name="mat_number" 
                                onChange={handleChange}   
                                value={form?.mat_number ? form.mat_number.toString() : ''} 
                                id="mat_number" 
                                className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" 
                                placeholder=" " 
                                required 
                            />
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
                                        <Radio id="mat_ply_4" onChange={handleChange} name="mat_ply" defaultChecked={form?.mat_ply=== '4-ply'}/>
                                        <Label htmlFor="mat_ply_4">4-ply</Label>
                                    </div>
                                    <div className="group">
                                         {/* mat_ply */}
                                        <Radio id="mat_ply_8" onChange={handleChange} name="mat_ply" defaultChecked={form?.mat_ply=== '8-ply'}/>
                                        <Label htmlFor="mat_ply_8">8-ply</Label>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="grid grid-cols-1 gap-8" id="checkbox">
                                <fieldset>
                                    <div className="group mb-4">
                                         {/* mat_window */}
                                         <Checkbox id="mat_window" onChange={handleChange} defaultChecked={form?.mat_window} name="mat_window" />
                                        <Label htmlFor="mat_window">window</Label>
                                    </div>
                                    <div className="group gap-2">
                                         {/* mat_double */}
                                         <Checkbox id="mat_double" onChange={handleChange} defaultChecked={form?.mat_double} name="mat_double"/>
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
                                    <input type="number" id="mat_in_visible" onChange={handleChange} value={form?.mat_in_visible} name="mat_in_visible" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                                <input type="text" id="mat_in_total" onChange={handleChange} value={form?.mat_in_total} name="mat_in_total" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                                    <input type="text" id="mat_inside_height" onChange={handleChange} value={form?.mat_inside_height} name="mat_inside_height" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                    <input type="text" id="mat_inside_width" onChange={handleChange} value={form?.mat_outside_width} name="mat_inside_width" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                    <input type="text" id="mat_outside_height" onChange={handleChange} value={form?.mat_outside_height} name="mat_outside_height" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                <input type="text" id="mat_outside_width" onChange={handleChange} value={form?.mat_outside_width} name="mat_outside_width" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                    <Radio id="glazing_glass" onChange={handleChange} name="glazing" value="glass" defaultChecked={form?.glazing === 'glass'}/>
                                    <Label htmlFor="glazing_glass">Glass</Label>
                                </div>
                                <div className="group">
                                    <Radio id="glazing_plexi" onChange={handleChange} name="glazing" value="plexiglass" defaultChecked={form?.glazing === 'plexiglass'}/>
                                    <Label htmlFor="glazing_plexi">Plexiglass</Label>
                                </div>
                            </div>
                        </fieldset>

                        <ul className="items-center w-full text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    {/* glazing_type */}
                                    <input id="premium_clear" onChange={handleChange} value='pc' defaultChecked={form?.glazing_type === 'pc'} name="glazing_type" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="premium_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Premium Clear </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="conservation_clear" onChange={handleChange} value='cc' defaultChecked={form?.glazing_type === 'cc'} type="radio"  name="glazing_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="conservation_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Conservation Clear</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="museum" type="radio" onChange={handleChange} value='m' defaultChecked={form?.glazing_type === 'm'} name="glazing_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
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
                                <Radio id="spacers_true" onChange={handleChange} name="spacers" value="true" defaultChecked={form?.spacers === true}/>
                                <Label htmlFor="spacers_true">Yes</Label>
                            </div>
                            <div className="group">
                                <Radio id="spacers_false" onChange={handleChange} name="spacers" value="false" defaultChecked={form?.spacers === false}/>
                                <Label htmlFor="spacers_false">No</Label>
                            </div>
                        </div>
                        </fieldset>

                        <ul className="items-center w-full text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    {/* spacers_type */}
                                    <input id="spacers_clear" onChange={handleChange} type="radio" value='c' defaultChecked={form?.spacers_type === 'c'} name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="spacers_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">clear </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="spacers_white" onChange={handleChange} type="radio" value='w' defaultChecked={form?.spacers_type === 'w'} name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="spacers_white" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">white</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="spacers_match" onChange={handleChange} type="radio" value='m' defaultChecked={form?.spacers_type === 'm'} name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
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
                                <input type="text" id="canvas_floater" onChange={handleChange} value={form?.canvas_floater} name="canvas_floater" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
                        <Checkbox id="straight_to_frame" defaultChecked={form?.straight_to_frame === true} onChange={handleChange} name="straight_to_frame"/>
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
                        <input type="text" onChange={handleChange} value={form?.art_location} name="art_location" id="art_location" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="art_location" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Location</Label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        {/* artwork_condition */}
                        <input type="text" onChange={handleChange} value={form?.art_condition} name="art_condition" id="art_condition" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="art_condition" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Condition</Label>
                    </div>
                   
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="grid grid-cols-2 gap-8" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                {/* is_completed */}
                                <Checkbox id="is_completed" onChange={handleChange} defaultChecked={form?.is_completed === true} name="is_completed"/>
                                <Label htmlFor="is_completed">Completed</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* client_notified */}
                                <Checkbox id="client_notified" onChange={handleChange} defaultChecked={form?.client_notified} name="client_notified" />
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
                        <input type="text" onChange={handleChange} value={form?.final_location} name="final_location" id="final_location" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="final_location" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Final Location</Label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                            {/* payment_type */}
                            <input type="text" onChange={handleChange} value={form?.payment_type} name="payment_type" id="floating_company" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="payment_type" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Payment Type</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                {/* deposit */}
                                <Checkbox id="deposit" onChange={handleChange} name="deposit" defaultChecked={form?.balance_paid}/>
                                <Label htmlFor="deposit">balance paid</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* balance_paid */}
                                <Checkbox id="balance_paid" onChange={handleChange} name="balance_paid" defaultChecked={form?.deposit}/>
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
                            onClick={() => {
                                console.log("DELETE BUTTON: frame customer id", frame?.customer);
                                
                                const customerId = frame?.customer?.id ?? 0;
                                const frameId = frame?.id ?? 0;
                                console.log(`Customer ${customerId} and frame ${frameId}`)
                                if (frameId && customerId) {
                                    deleteFrame(frameId, customerId, router);
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
    )
}

export default EditFrame;
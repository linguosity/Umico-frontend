import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Label, FileInput, List, Checkbox, Radio, TextInput, Button, Datepicker} from 'flowbite-react'
import Link from 'next/link';
import { Frame as FrameType } from '../types/frames';

interface FrameProps {
    frame: FrameType | null;
}

const Frame: React.FC<FrameProps> = ({frame}) => {

    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        console.log("Frame prop updated in Frame no-edit child component:", frame);
    }, [frame]);
    
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
                        <h5>Frame ID:</h5>
                    </List.Item>
                    <List.Item>
                        <h5>{frame?.id}</h5>
                    </List.Item>
                    <List.Item>
                        |
                    </List.Item>
                    <List.Item>
                        <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                            {frame?.customer.last_name}, {frame?.customer.first_name}
                        </h5>
                    </List.Item>
                    <List.Item>
                        <p className="font-regular text-gray-700 dark:text-gray-400">
                            {frame?.customer.phone_number}
                        </p>
                    </List.Item>
                    <List.Item>
                        <p className="font-regular text-gray-700 dark:text-gray-400">
                            {frame?.customer.email}
                        </p>
                    </List.Item>
                    <List.Item>
                         
                    </List.Item>
                   
                </List>
            </Card>
            <div className="w-full">
                <div className="inline-flex items-center justify-center w-full">
                    <hr className="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left- dark:text-white dark:bg-gray-900">Framing</span>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4 m-4">
                <div>
                    <div className="grid grid-cols-2">
                        
                        <div className="relative w-full mb-5 group">
                            {/* deadline */}
                            <Datepicker readOnly datepicker-format="yyyy/MM/dd" data-date={frame?.deadline} value={frame?.deadline} name="deadline" id="deadline" className="block py-2.5 px-0 w-4/5 text-xs text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" required />
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
                                readOnly
                                name="image_width"
                                value={frame?.image_width}
                                type="number"
                                placeholder="W"
                                className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                                {/* image_height */}
                                <TextInput
                                id="image_height"
                                readOnly
                                name="image_height"
                                value={frame?.image_height}
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
                                readOnly
                                value={frame?.frame_width}
                                id="width"
                                type="number"
                                placeholder="W"
                                className="block w-24 p-1.5 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white text-center"
                                />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">x</span>
                                {/* frame_height */}
                                <TextInput
                                name="frame_height"
                                value={frame?.frame_height}
                                readOnly
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
                                <FileInput id="thumbnail" readOnly  helperText="Upload" name="thumbnail"/>
                            </div>
                        </div>
                        <div className="flex ">
                            <img src={frame?.thumbnail} width="35%" className="h-auto max-w-xs rounded-lg" />
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
                            <input type="text" name="moulding" value={frame?.moulding} readOnly id="moulding" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="moulding" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">moulding</Label>
                        </div>
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* moulding_number */}
                            <input type="number" name="moulding_number" value={frame?.moulding_number.toString()} readOnly id="moulding_number" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
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
                                    <Radio id="float_type_float" readOnly value='float'  name="float_type" defaultChecked={frame?.float_type === 'float'}/>
                                    <Label htmlFor="float_type_float">float</Label>
                                </div>
                                <div className="group">
                                    <Radio id="float_type_raised" readOnly value='raised' name="raised" defaultChecked={frame?.float_type === 'raised'}/>
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
                                    <input type="text" id="float_in_visible" readOnly name="float_in_visible" value={frame?.float_in_visible} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                                <input type="text" id="float_in_total" readOnly name="float_in_total" value={frame?.float_in_total} data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                            <input type="text" name="mat" id="mat" readOnly value={frame?.mat} className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="mat" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">mat</Label>
                        </div>
                        <div className="relative z-0 w-3/4 mb-5 group">
                            {/* mat_number */}
                            <input type="number" name="mat_number" readOnly value={frame?.mat_number.toString()} id="mat_number" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
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
                                        <Radio id="mat_ply_4" readOnly name="mat_ply" defaultChecked={frame?.mat_ply=== '4-ply'}/>
                                        <Label htmlFor="mat_ply_4">4-ply</Label>
                                    </div>
                                    <div className="group">
                                         {/* mat_ply */}
                                        <Radio id="mat_ply_8" readOnly name="mat_ply" defaultChecked={frame?.mat_ply=== '8-ply'}/>
                                        <Label htmlFor="mat_ply_8">8-ply</Label>
                                    </div>
                                </fieldset>
                            </div>
                            <div className="grid grid-cols-1 gap-8" id="checkbox">
                                <fieldset>
                                    <div className="group mb-4">
                                         {/* mat_window */}
                                         <Checkbox id="mat_window" disabled defaultChecked={frame?.mat_window} name="mat_window" />
                                        <Label htmlFor="mat_window">window</Label>
                                    </div>
                                    <div className="group gap-2">
                                         {/* mat_double */}
                                         <Checkbox id="mat_double" disabled defaultChecked={frame?.mat_double} name="mat_double"/>
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
                                    <input type="number" id="mat_in_visible" readOnly value={frame?.mat_in_visible} name="mat_in_visible" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                                <input type="text" id="mat_in_total" readOnly value={frame?.mat_in_total} name="mat_in_total" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="999" required />
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
                                    <input type="text" id="mat_inside_height" readOnly value={frame?.mat_inside_height} name="mat_inside_height" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                    <input type="text" id="mat_inside_width" readOnly value={frame?.mat_outside_width} name="mat_inside_width" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                    <input type="text" id="mat_outside_height" readOnly value={frame?.mat_outside_height} name="mat_outside_height" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                <input type="text" id="mat_outside_width" readOnly value={frame?.mat_outside_width} name="mat_outside_width" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0" required />
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
                                    <Radio id="glazing_glass" readOnly name="glazing" value="glass" defaultChecked={frame?.glazing === 'glass'}/>
                                    <Label htmlFor="glazing_glass">Glass</Label>
                                </div>
                                <div className="group">
                                    <Radio id="glazing_plexi" readOnly name="glazing" value="plexiglass" defaultChecked={frame?.glazing === 'plexiglass'}/>
                                    <Label htmlFor="glazing_plexi">Plexiglass</Label>
                                </div>
                            </div>
                        </fieldset>

                        <ul className="items-center w-full text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    {/* glazing_type */}
                                    <input id="premium_clear" readOnly value='pc' defaultChecked={frame?.glazing_type === 'pc'} name="glazing_type" type="radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="premium_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Premium Clear </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="conservation_clear" readOnly value='cc' defaultChecked={frame?.glazing_type === 'cc'} type="radio"  name="glazing_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="conservation_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">Conservation Clear</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="museum" type="radio" readOnly value='m' defaultChecked={frame?.glazing_type === 'm'} name="glazing_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
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
                                <Radio id="spacers_true" readOnly name="spacers" value="true" defaultChecked={frame?.spacers === true}/>
                                <Label htmlFor="spacers_true">Yes</Label>
                            </div>
                            <div className="group">
                                <Radio id="spacers_false" readOnly name="spacers" value="false" defaultChecked={frame?.spacers === false}/>
                                <Label htmlFor="spacers_false">No</Label>
                            </div>
                        </div>
                        </fieldset>

                        <ul className="items-center w-full text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    {/* spacers_type */}
                                    <input id="spacers_clear" readOnly type="radio" value='c' defaultChecked={frame?.spacers_type === 'c'} name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="spacers_clear" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">clear </label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="spacers_white" readOnly type="radio" value='w' defaultChecked={frame?.spacers_type === 'w'} name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
                                    <label htmlFor="spacers_white" className="w-full py-3 ms-2 text-xs font-medium text-gray-900 dark:text-gray-300">white</label>
                                </div>
                            </li>
                            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                <div className="flex items-center ps-3">
                                    <input id="spacers_match" readOnly type="radio" value='m' defaultChecked={frame?.spacers_type === 'm'} name="spacers_type" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"/>
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
                                <input type="text" id="canvas_floater" readOnly value={frame?.canvas_floater} name="canvas_floater" data-input-counter aria-describedby="helper-text-explanation" className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-xs focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
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
                        <Checkbox id="straight_to_frame" defaultChecked={frame?.straight_to_frame === true} disabled name="straight_to_frame"/>
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
                        <input type="text" readOnly value={frame?.art_location} name="art_location" id="art_location" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="art_location" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Location</Label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        {/* artwork_condition */}
                        <input type="text" readOnly value={frame?.art_condition} name="art_condition" id="art_condition" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="art_condition" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Condition</Label>
                    </div>
                   
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="grid grid-cols-2 gap-8" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                {/* is_completed */}
                                <Checkbox id="is_completed" disabled defaultChecked={frame?.is_completed === true} name="is_completed"/>
                                <Label htmlFor="is_completed">Completed</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* client_notified */}
                                <Checkbox id="client_notified" disabled defaultChecked={frame?.client_notified} name="client_notified" />
                                <Label htmlFor="client_notified">Notified</Label>
                            </div>
                            {/* notification_date */}
                            <Datepicker readOnly name="notification_date" data-date={frame?.notification_date} datepicker-format="yyyy/MM/dd"/>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div className="relative z-0 w-full mb-5 group">
                        {/* final_location */}
                        <input type="text" readOnly value={frame?.final_location} name="final_location" id="final_location" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="final_location" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Final Location</Label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                            {/* payment_type */}
                            <input type="text" readOnly value={frame?.payment_type} name="payment_type" id="floating_company" className="block py-2.5 px-0 w-full text-xs text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="payment_type" className="peer-focus:font-medium absolute text-xs text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Payment Type</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-4" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                {/* deposit */}
                                <Checkbox id="deposit" disabled name="deposit" defaultChecked={frame?.balance_paid}/>
                                <Label htmlFor="deposit">balance paid</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* balance_paid */}
                                <Checkbox id="balance_paid" disabled name="balance_paid" defaultChecked={frame?.deposit}/>
                                <Label htmlFor="balance_paid">deposit</Label>
                            </div>
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
               
                
            </div>
            
        

    );
}

export default Frame;
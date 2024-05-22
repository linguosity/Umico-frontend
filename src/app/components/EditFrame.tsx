'use client'
import React from 'react';
import { Card, Label, FileInput, List, Checkbox} from 'flowbite-react';
import Image from 'next/image'
import { Frame as FrameType } from '../types/frames';
import { Datepicker } from "flowbite-react";

interface EditFrameProps {
    frame: FrameType | null;
}

const EditFrame: React.FC<EditFrameProps> = ({ frame }) => {

    return(
        <div className="m-4 grid grid-flow-row auto-rows-max">
            <Card>
                <List horizontal>
                    <List.Item>
                        <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
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
            <div className="grid grid-cols-2 gap-8 m-8">
                <div>
                    <div className="grid grid-cols-2">
                        <div className="relative w-full mb-5 group">
                            <Datepicker 
                                type="Date" 
                                name="date" 
                                id="date" 
                                className="block py-2.5 px-0 w-4/5 text-sm text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-50" 
                                placeholder=" " 
                                required 
                                labelTodayButton="Today" 
                                labelClearButton="Clear"
                            />
                            <Label htmlFor="date" className="peer-focus:font-medium  text-sm text-gray-500 absolute dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Today's Date</Label>
                        </div>
                        <div className="relative w-full mb-5 group">
                            <Datepicker type="Date" name="deadline" id="deadline" className="block py-2.5 px-0 w-4/5 text-sm text-gray-900 bg-transparent appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer z-10" placeholder=" " required />
                            <Label htmlFor="deadline" className="peer-focus:font-medium text-sm text-gray-500 dark:text-gray-400 absolute duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Deadline</Label>
                        </div>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <div id="fileUpload" className="max-w-md">
                            <div className="mb-2 block">
                                <Label htmlFor="file"/>
                            </div>
                            <FileInput id="file" helperText="Upload an image of the art" />
                        </div>
                    </div>
                </div>

                <div className="relative w-full">
                    <img src="https://cdn.midjourney.com/88deed3d-ddb3-464e-a833-2ebafc77ba67/0_1.jpeg" width="50%" className="h-auto max-w-xs rounded-lg" />
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
                        <input type="text" name="current_location" id="current_location" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="current_location" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Location</Label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="artwork_condition" id="artwork_condition" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="artwork_condition" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Artwork Condition</Label>
                    </div>
                   
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="flex max-w-md flex-col gap-4" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                <Checkbox id="promotion" />
                                <Label htmlFor="promotion">Completed</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="age" />
                                <Label htmlFor="age">Notified</Label>
                            </div>
                            <Datepicker/>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="text" name="final_location" id="floating_repeat_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <Label htmlFor="floating_repeat_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Final Location</Label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_company" id="floating_company" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <Label htmlFor="floating_company" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Payment Type</Label>
                    </div>
                    <div className="flex max-w-md flex-col gap-4" id="checkbox">
                        
                            <div className="flex items-center gap-2">
                                <Checkbox id="promotion" />
                                <Label htmlFor="promotion">Balance Paid</Label>
                            </div>
                            
                        </div>
                </div>
            </div>
            
        </div>
    )
}

export default EditFrame;
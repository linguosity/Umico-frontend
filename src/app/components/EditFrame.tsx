'use client'
import React from 'react';
import { Card } from 'flowbite-react';
import { Frame as FrameType } from '../types/frames';
import { Datepicker } from "flowbite-react";

interface EditFrameProps {
    frame: FrameType | null;
}

const editFrame: React.FC<EditFrameProps> = ({ frame }) => {

    return(
        <div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="grid gap-4">
                    <div>
                        <Card className="max-w-sm">
                            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {frame?.customer.last_name}, {frame?.customer.first_name}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                <span>Phone: {frame?.customer.phone_number} </span>
                                <span>Email: {frame?.customer?.email}</span>
                            </p>
                        </Card>
                    </div>
                    <div>
                        <Datepicker inline/>;
                        {frame?.art_condition} 
                    </div>
                    <div>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        
                    </div>
                    <div>
                        <figure className="max-w-lg">
                            <img className="h-auto max-w-full rounded-lg" src="https://cdn.midjourney.com/7c544095-ed81-4b6b-a605-ced89ffd7b37/0_0.jpeg?prog=true" alt="image description" width="150px"/>
                            <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">Image caption</figcaption>
                        </figure>
                    </div>
                    <div>
                        
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default editFrame;
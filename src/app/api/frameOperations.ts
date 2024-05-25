"use client"
import { useState } from "react";

import { Frame } from '../types/frames';

const URL = 'http://127.0.0.1:8000/customers/'


//const [frame, setFrame] = useState<Frame | null>(null);

export const updateFrame = async (frame: Frame, id: number, frameId: number) => {
    //make post request to create people
    await fetch(URL + id + '/frames/' + frameId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(frame),
    });

};

export const deleteFrame = async (frameId: number, customerId: number) => {

    await fetch(URL + 'delete_frame', {
        method: "DELETE",

    });

};


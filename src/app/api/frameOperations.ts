"use client"

import { Frame } from '../types/frames';

//const [frame, setFrame] = useState<Frame | null>(null);

export const updateFrame = async (form: Frame, id: number, frame_id: number) => {

    const URL = `http://127.0.0.1:8000/customers/${id}/frames/${frame_id}/`

    //make post request to create people
    await fetch(URL, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Token 3ce57f1f41bb58e5ea2d8ff460f3409989311e2d"
        }, 
        body: JSON.stringify(form),
    });

};

export const deleteFrame = async (frame_id: number, customerId: number, router: any) => {

    const URL = `http://127.0.0.1:8000/customers/${customerId}/frames/${frame_id}/`
    const URL_REDIRECT = `http://127.0.0.1:3000/customers/${customerId}`

    try{
        const response = await fetch(URL, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token 3ce57f1f41bb58e5ea2d8ff460f3409989311e2d"
            }, 
    
        body: JSON.stringify({frame_id, customerId }),
    
        });

        if (response.ok) {
            router.push(URL_REDIRECT);
        } else {
            console.error("Failed to delete the frame");
        }

    }catch(error){
        console.error("error", error);
    }
    
};


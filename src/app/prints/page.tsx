"use client";

import { useState, useEffect } from "react";
import {Card, Table, Checkbox, Label} from 'flowbite-react';
import { Print } from '../types/print'

export default function Page() {

  //set customerList state to update when data fetch is complete
  const [printList, setPrintList] = useState<Print[]>([]);

  const getPrintData = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/prints/`, {
        credentials: 'include',
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }
      
      const printData: Print[] = await res.json();
      setPrintList(printData);

    }catch(err){
      console.log('error fetching customer data', err)
    }
    
  }

  useEffect(()=> {
    getPrintData();
  }, []);
  
  return (
    <div className="p-4 w-full">
      <div className="overflow-x-auto">
          <Table hoverable>
          <Table.Head>
              <Table.HeadCell> Client </Table.HeadCell>
              <Table.HeadCell>Deadline</Table.HeadCell>
              <Table.HeadCell>Job status</Table.HeadCell>
              <Table.HeadCell>Payment Status</Table.HeadCell>
              {/* <Table.HeadCell>Paper Height</Table.HeadCell>
              <Table.HeadCell>Paper Width</Table.HeadCell>
              <Table.HeadCell>Thumbnail</Table.HeadCell>
              <Table.HeadCell>Print Style</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Job Notes</Table.HeadCell> */}
            </Table.Head>
            <Table.Body className="divide-y">
              {printList.map((print, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell key={idx}> {print.customer.last_name}, {print.customer.first_name} </Table.Cell>
                  <Table.Cell>{new Date(print.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Table.Cell>
                  <Table.Cell>
                        <div className="flex max-w-md flex-col gap-4" id="checkbox">
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_window" checked={print.is_completed} disabled/>
                                <Label htmlFor="accept" className="flex">
                                    completed
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_double" checked={print.client_notified} disabled/>
                                <Label htmlFor="promotion">
                                    client notified
                                </Label>
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="flex max-w-md flex-col gap-4" id="checkbox">
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_window" checked={print.deposit} disabled/>
                                <Label htmlFor="accept" className="flex">
                                    deposit
                                </Label>
                            </div> 
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_double" checked={print.balance_paid} disabled/>
                                <Label htmlFor="promotion">
                                    balance paid
                                </Label>
                            </div>
                        </div>
                    </Table.Cell>
                  {/* <Table.Cell>{print.image_height}</Table.Cell>
                  <Table.Cell>{print.image_width}</Table.Cell>
                  <Table.Cell>{print.paper_height}</Table.Cell>
                  <Table.Cell>{print.paper_width}</Table.Cell>
                  <Table.Cell><img src={print.thumbnail} alt="Thumbnail" className="w-16 h-16" /></Table.Cell>
                  <Table.Cell>{print.print_style}</Table.Cell>
                  <Table.Cell>{print.quantity}</Table.Cell>
                  <Table.Cell>{print.job_notes}</Table.Cell> */}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Card, Table, Checkbox, Label } from 'flowbite-react';
import { Scan } from '../types'

export default function Page() {

  //set customerList state to update when data fetch is complete
  const [scanList, setScanList] = useState<Scan[]>([]);

  const getScanData = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scans/`, {
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
      
      const scanData: Scan[] = await res.json();
      setScanList(scanData);

    }catch(err){
      console.log('error fetching customer data', err)
    }
    
  }

  useEffect(()=> {
    getScanData();
  }, []);
  
  return (
    <div className="p-4 w-full">
      <div className="overflow-x-auto">
          <Table hoverable>
          <Table.Head>
            <Table.HeadCell> Client </Table.HeadCell>
            <Table.HeadCell>Deadline</Table.HeadCell>
            <Table.HeadCell>Job Status</Table.HeadCell>
            <Table.HeadCell>Payment Status</Table.HeadCell>
            {/* <Table.HeadCell>Image Width</Table.HeadCell>
            <Table.HeadCell>Image Height</Table.HeadCell>
            <Table.HeadCell>File Type</Table.HeadCell>
            <Table.HeadCell>DPI</Table.HeadCell>
            <Table.HeadCell>Notification Date</Table.HeadCell>
            <Table.HeadCell>Final Location</Table.HeadCell>
            <Table.HeadCell>Payment Type</Table.HeadCell> */}
            </Table.Head>
            <Table.Body className="divide-y">
            {scanList.map((scan, idx) => (
                <Table.Row key={idx}>

              <Table.Cell> {scan.customer.last_name}, {scan.customer.first_name} </Table.Cell>
              <Table.Cell> {scan.deadline ? 
                        new Date(scan.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}          
                    </Table.Cell>
                    <Table.Cell>
                        <div className="flex max-w-md flex-col gap-4" id="checkbox">
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_window" checked={scan.is_completed} disabled/>
                                <Label htmlFor="accept" className="flex">
                                    completed
                                </Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_double" checked={scan.client_notified} disabled/>
                                <Label htmlFor="promotion">
                                    client notified
                                </Label>
                            </div>
                        </div>
                    </Table.Cell>
                    <Table.Cell>
                        <div className="flex max-w-md flex-col gap-4" id="checkbox">
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_window" checked={scan.deposit} disabled/>
                                <Label htmlFor="accept" className="flex">
                                    deposit
                                </Label>
                            </div> 
                            <div className="flex items-center gap-2">
                                <Checkbox id="mat_double" checked={scan.balance_paid} disabled/>
                                <Label htmlFor="promotion">
                                    balance paid
                                </Label>
                            </div>
                        </div>
                    </Table.Cell>

                {/* <Table.Cell>{scan.image_width}</Table.Cell>
                <Table.Cell>{scan.image_height}</Table.Cell>
                <Table.Cell>{scan.file_type}</Table.Cell>
                <Table.Cell>{scan.dpi}</Table.Cell>
                <Table.Cell> {scan.notification_date ? 
                        new Date(scan.notification_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}          
                </Table.Cell>
                <Table.Cell>{scan.final_location}</Table.Cell>
                <Table.Cell>{scan.payment_type}</Table.Cell>{/* 
                <Table.Cell>{scan.deposit_made ? 'Yes' : 'No'}</Table.Cell> */}
                </Table.Row>
            ))}
            </Table.Body>
          </Table>
        </div>
    </div>
  );
}

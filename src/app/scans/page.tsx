"use client";

import { useState, useEffect } from "react";
import { Card, Table } from 'flowbite-react';
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
      <Card className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
        <div className="overflow-x-auto">
          <Table hoverable>
          <Table.Head>
            <Table.HeadCell>Deadline</Table.HeadCell>
            <Table.HeadCell>Image Height</Table.HeadCell>
            <Table.HeadCell>Image Width</Table.HeadCell>
            <Table.HeadCell>File Type</Table.HeadCell>
            <Table.HeadCell>DPI</Table.HeadCell>
            <Table.HeadCell>Thumbnail</Table.HeadCell>
            <Table.HeadCell>Is Completed</Table.HeadCell>
            <Table.HeadCell>Client Notified</Table.HeadCell>
            <Table.HeadCell>Notification Date</Table.HeadCell>
            <Table.HeadCell>Final Location</Table.HeadCell>
            <Table.HeadCell>Payment Type</Table.HeadCell>
            <Table.HeadCell>Deposit Made</Table.HeadCell>
            <Table.HeadCell>Balance Paid</Table.HeadCell>
            </Table.Head>
            <Table.Body>
            {scanList.map((scan, idx) => (
                <Table.Row key={idx}>
                <Table.Cell>{new Date(scan.deadline).toLocaleString()}</Table.Cell>
                <Table.Cell>{scan.image_height}</Table.Cell>
                <Table.Cell>{scan.image_width}</Table.Cell>
                <Table.Cell>{scan.file_type}</Table.Cell>
                <Table.Cell>{scan.dpi}</Table.Cell>
                <Table.Cell><img src={scan.thumbnail} alt="Thumbnail" className="w-16 h-16" /></Table.Cell>
                <Table.Cell>{scan.is_completed ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>{scan.client_notified ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>{scan.notification_date ? new Date(scan.notification_date).toLocaleString() : 'N/A'}</Table.Cell>
                <Table.Cell>{scan.final_location}</Table.Cell>
                <Table.Cell>{scan.payment_type}</Table.Cell>
                <Table.Cell>{scan.deposit_made ? 'Yes' : 'No'}</Table.Cell>
                <Table.Cell>{scan.balance_paid ? 'Yes' : 'No'}</Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
}

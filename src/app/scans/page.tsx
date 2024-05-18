"use client";

import { useState, useEffect } from "react";
import {Card, Table } from 'flowbite-react';

export default function Page() {

    // Employee Interface: Corresponds to the Employee model in Django
  interface Customer {
    id: number; // This represents the primary key
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    }

  // Prints Interface: Corresponds to the Address model in Django
  interface Scan {
    id: number; // This represents the primary key
    deadline: string; // ISO 8601 format date-time string
    customer: Customer; // ForeignKey relation to Customer
    created_at: string; // ISO 8601 format date-time string
  
    // SCAN JOB ATTRIBUTES
    image_height: number; // Decimal value
    image_width: number; // Decimal value
    file_type: string; // Type of the file
    dpi: number; // Decimal value for DPI
    thumbnail: string; // URL to the thumbnail image
    is_completed: boolean; // Boolean indicating if the scan is completed
    client_notified: boolean; // Boolean indicating if the client is notified
    notification_date: string | null; // ISO 8601 format date-time string, can be null
    final_location: string; // Final location of the scan
    payment_type: string; // Payment type for the scan
    deposit_made: boolean; // Boolean indicating if the deposit is made
    balance_paid: boolean; // Boolean indicating if the balance is paid
  }

  //set customerList state to update when data fetch is complete
  const [scanList, setScanList] = useState<Scan[]>([]);

  const getScanData = async () => {
    try{
      const res = await fetch('http://127.0.0.1:8000/prints/');
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }
      
      const scanData: Scan[] = await res.json();
      setScanList(scanData);
      console.log(scanData);

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

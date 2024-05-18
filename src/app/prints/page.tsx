"use client";

import { useState, useEffect } from "react";
import {Card, Table } from 'flowbite-react';

export default function Page() {

  
  // Prints Interface: Corresponds to the Address model in Django
  interface Print {
    id: number; // This represents the primary key
    deadline: string; // ISO 8601 format date-time string
    customer: number; // ForeignKey relation to Customer (represented by Customer ID)
    created_at: string; // ISO 8601 format date-time string
  
    // PRINT JOB ATTRIBUTES
    image_height: number; // Decimal value
    image_width: number; // Decimal value
    paper_height: number; // Decimal value
    paper_width: number; // Decimal value
    thumbnail: string; // URL to the thumbnail image
    print_style: string; // String describing the print style
    quantity: number; // Integer value for quantity
    job_notes: string; // Text field for job notes
  }

  //set customerList state to update when data fetch is complete
  const [printList, setPrintList] = useState<Print[]>([]);

  const getPrintData = async () => {
    try{
      const res = await fetch('http://127.0.0.1:8000/prints/');
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
      
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }
      
      const printData: Print[] = await res.json();
      setPrintList(printData);
      console.log(printData);

    }catch(err){
      console.log('error fetching customer data', err)
    }
    
  }

  useEffect(()=> {
    getPrintData();
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
              <Table.HeadCell>Paper Height</Table.HeadCell>
              <Table.HeadCell>Paper Width</Table.HeadCell>
              <Table.HeadCell>Thumbnail</Table.HeadCell>
              <Table.HeadCell>Print Style</Table.HeadCell>
              <Table.HeadCell>Quantity</Table.HeadCell>
              <Table.HeadCell>Job Notes</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {printList.map((print, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>{new Date(print.deadline).toLocaleString()}</Table.Cell>
                  <Table.Cell>{print.image_height}</Table.Cell>
                  <Table.Cell>{print.image_width}</Table.Cell>
                  <Table.Cell>{print.paper_height}</Table.Cell>
                  <Table.Cell>{print.paper_width}</Table.Cell>
                  <Table.Cell><img src={print.thumbnail} alt="Thumbnail" className="w-16 h-16" /></Table.Cell>
                  <Table.Cell>{print.print_style}</Table.Cell>
                  <Table.Cell>{print.quantity}</Table.Cell>
                  <Table.Cell>{print.job_notes}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
}

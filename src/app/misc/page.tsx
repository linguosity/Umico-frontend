"use client";

import { useState, useEffect } from "react";
import { Card, Table } from 'flowbite-react';
import { Misc } from '../types/misc';

export default function Page() {
  // set miscList state to update when data fetch is complete
  const [miscList, setMiscList] = useState<Misc[]>([]);

  const getMiscData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/misc/`, {
        credentials: 'include',
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
      }
      
      const miscData: Misc[] = await res.json();
      setMiscList(miscData);

    } catch (err) {
      console.log('error fetching misc data', err);
    }
  }

  useEffect(() => {
    getMiscData();
  }, []);
  
  return (
    <div className="p-4 w-full">
      <div className="overflow-x-auto">
        <Table hoverable>
          <Table.Head>
            <Table.HeadCell> Client </Table.HeadCell>
            <Table.HeadCell>Deadline</Table.HeadCell>
            <Table.HeadCell>Job Notes</Table.HeadCell>
            <Table.HeadCell>Is Completed</Table.HeadCell>
            <Table.HeadCell>Client Notified</Table.HeadCell>
            <Table.HeadCell>Notification Date</Table.HeadCell>
            <Table.HeadCell>Final Location</Table.HeadCell>
            <Table.HeadCell>Payment Type</Table.HeadCell>
            <Table.HeadCell>Deposit</Table.HeadCell>
            <Table.HeadCell>Balance Paid</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {miscList.map((misc, idx) => (
              <Table.Row key={idx}>
                <Table.Cell key={idx}> {misc.customer.last_name}, {misc.customer.first_name} </Table.Cell>
                <Table.Cell>{new Date(misc.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</Table.Cell>
                <Table.Cell>{misc.job_notes}</Table.Cell>
                <Table.Cell>{misc.is_completed ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{misc.client_notified ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{misc.notification_date ? new Date(misc.notification_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "N/A"}</Table.Cell>
                <Table.Cell>{misc.final_location}</Table.Cell>
                <Table.Cell>{misc.payment_type}</Table.Cell>
                <Table.Cell>{misc.deposit ? "Yes" : "No"}</Table.Cell>
                <Table.Cell>{misc.balance_paid ? "Yes" : "No"}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {/*  END HR */}
        <div className="inline-flex items-center justify-center w-full">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900"> END </span>
        </div>
      </div>
    </div>
  );
}

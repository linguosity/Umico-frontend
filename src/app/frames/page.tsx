"use client";

import { useState, useEffect } from "react";
import {Card, Table, Timeline, Button } from 'flowbite-react';
import { Frame } from '../types/frames'
import { HiCalendar, HiArrowNarrowRight } from 'react-icons/hi';

export default function Page() {

  //set customerList state to update when data fetch is complete
  const [frameList, setFrameList] = useState<Frame[]>([]);

  const getFrameData = async () => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/frames/`, {
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
      
      const frameData: Frame[] = await res.json();
      setFrameList(frameData);

    }catch(err){
      console.log('error fetching customer data', err)
    }
    
  }

  useEffect(()=> {
    getFrameData();
  }, []);
  
  return (
    <>      
     {/* <div className="p-4 w-full">
      <Card className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
        <Timeline horizontal>
        {frameList.map((frame, idx) => (
          <Timeline.Item key={idx}>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>{new Date(frame.deadline).toLocaleDateString()}</Timeline.Time>
              <Timeline.Body>
                <p>{frame.customer.last_name}</p>
                <p>{frame.customer.first_name}</p> 
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
           ))}
        </Timeline>
      </Card>
      </div> */}
      <div className="p-4 w-full"></div>
        <Card className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
          <div className="overflow-x-auto">
            <Table hoverable>
              <Table.Head>
                <Table.HeadCell>Deadline</Table.HeadCell>
                <Table.HeadCell>Image Dimensions</Table.HeadCell>
                <Table.HeadCell>Frame Dimensions</Table.HeadCell>
                <Table.HeadCell>Moulding</Table.HeadCell>
                <Table.HeadCell>Mat</Table.HeadCell>
                <Table.HeadCell>Mat Ply</Table.HeadCell>
                <Table.HeadCell>Mat Window</Table.HeadCell>
                <Table.HeadCell>Mat Double</Table.HeadCell>
                <Table.HeadCell>Mat In Visible</Table.HeadCell>
                <Table.HeadCell>Mat Inside Height</Table.HeadCell>
                <Table.HeadCell>Mat Inside Width</Table.HeadCell>
                <Table.HeadCell>Mat Outside Height</Table.HeadCell>
                <Table.HeadCell>Mat Outside Width</Table.HeadCell>
                <Table.HeadCell>Float Type</Table.HeadCell>
                <Table.HeadCell>Float In Visible</Table.HeadCell>
                <Table.HeadCell>Float In Total</Table.HeadCell>
                <Table.HeadCell>Glazing</Table.HeadCell>
                <Table.HeadCell>Thumbnail</Table.HeadCell>
                <Table.HeadCell>Glazing Type</Table.HeadCell>
                <Table.HeadCell>Spacers</Table.HeadCell>
                <Table.HeadCell>Spacers Type</Table.HeadCell>
                <Table.HeadCell>Canvas Floater</Table.HeadCell>
                <Table.HeadCell>Straight to Frame</Table.HeadCell>
                <Table.HeadCell>Art Location</Table.HeadCell>
                <Table.HeadCell>Art Condition</Table.HeadCell>
                <Table.HeadCell>Is Completed</Table.HeadCell>
                <Table.HeadCell>Client Notified</Table.HeadCell>
                <Table.HeadCell>Notification Date</Table.HeadCell>
                <Table.HeadCell>Final Location</Table.HeadCell>
                <Table.HeadCell>Payment Type</Table.HeadCell>
                <Table.HeadCell>Deposit</Table.HeadCell>
                <Table.HeadCell>Balance Paid</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {frameList.map((frame, idx) => (
                  <Table.Row key={idx}> 
                    <Table.Cell>{new Date(frame.deadline).toLocaleString()}</Table.Cell>
                    <Table.Cell>{frame.image_width} x {frame.image_height}</Table.Cell>
                    <Table.Cell>{frame.frame_width} x {frame.frame_height}</Table.Cell>
                    <Table.Cell>{frame.moulding}</Table.Cell>
                    <Table.Cell>{frame.mat}</Table.Cell>
                    <Table.Cell>{frame.mat_ply}</Table.Cell>
                    <Table.Cell>{frame.mat_window ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{frame.mat_double ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{frame.mat_in_visible}</Table.Cell>
                    <Table.Cell>{frame.mat_inside_height}</Table.Cell>
                    <Table.Cell>{frame.mat_inside_width}</Table.Cell>
                    <Table.Cell>{frame.mat_outside_height}</Table.Cell>
                    <Table.Cell>{frame.mat_outside_width}</Table.Cell>
                    <Table.Cell>{frame.float_type}</Table.Cell>
                    <Table.Cell>{frame.float_in_visible}</Table.Cell>
                    <Table.Cell>{frame.float_in_total}</Table.Cell>
                    <Table.Cell>{frame.glazing}</Table.Cell>
                    <Table.Cell><img src={frame.thumbnail} alt="Thumbnail" className="w-16 h-16" /></Table.Cell>
                    <Table.Cell>{frame.glazing_type}</Table.Cell>
                    <Table.Cell>{frame.spacers ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{frame.spacers_type}</Table.Cell>
                    <Table.Cell>{frame.canvas_floater}</Table.Cell>
                    <Table.Cell>{frame.straight_to_frame ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{frame.art_location}</Table.Cell>
                    <Table.Cell>{frame.art_condition}</Table.Cell>
                    <Table.Cell>{frame.is_completed ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{frame.client_notified ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{frame.notification_date ? new Date(frame.notification_date).toLocaleString() : 'N/A'}</Table.Cell>
                    <Table.Cell>{frame.final_location}</Table.Cell>
                    <Table.Cell>{frame.payment_type}</Table.Cell>
                    <Table.Cell>{frame.deposit ? 'Yes' : 'No'}</Table.Cell>
                    <Table.Cell>{frame.balance_paid ? 'Yes' : 'No'}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Card>
  </>
  );
}

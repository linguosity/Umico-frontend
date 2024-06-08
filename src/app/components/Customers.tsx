"use client";

import { Table, Card, List, Accordion, Badge } from "flowbite-react";
import AddCustomer from '../components/AddCustomer';
import Loading from '../components/Loading';
import {Suspense, useEffect, useState,} from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Print } from '../types/print';
import { Scan } from '../types/scan';
import { Frame } from '../types/frames';
import Image from 'next/image';

export default function Home() {

  //
  // Address Interface: Corresponds to the Address model in Django
  interface Address {
  id: number; // This represents the primary key
  customer: number; // ForeignKey relation to Customer
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  }

// Employee Interface: Corresponds to the Employee model in Django
  interface Customer {
  id: number; // This represents the primary key
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  shipping_addresses: Address[];
  prints?: Print[];
  scans?: Scan[];
  frames?: Frame[];
  }

  //set customerList state to update when data fetch is complete
  const [customerList, setCustomerList] = useState<Customer[]>([]);
  
  const getCustomerData = async () => {

    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/customers/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          "Authorization": `Token ${process.env.NEXT_PUBLIC_API_TOKEN}`
        }
      });
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.

     
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error(`${res.statusText}`);
      }
      
      const customerData: Customer[] = await res.json();
      setCustomerList(customerData);
      console.log(customerData);
      

    }catch(err){
      console.log('error fetching customer data', err)
    }
   
  }

  useEffect(()=> {
    getCustomerData();
  }, []);


  return (
    <div > 
      <Card className="bg-amber-200">
   
    <List horizontal>
        <List.Item>
            <svg className="w-8 h-8 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
            </svg>
        </List.Item>
        <List.Item>
            <h5>Customer</h5>
        </List.Item>
        <List.Item>
            <h5>{customerList.length}</h5>
        </List.Item>
        <List.Item>
            |
        </List.Item>
        <List.Item>
            <h5 className="text-l font-semibold tracking-tight text-gray-900 dark:text-white">
                
            </h5>
        </List.Item>
        <List.Item>
            <p className="font-regular text-gray-700 dark:text-gray-400">
                
            </p>
        </List.Item>
        <List.Item>
            <p className="font-regular text-gray-700 dark:text-gray-400">
                
            </p>
        </List.Item>
        <List.Item>
             
        </List.Item>
       
    </List>
</Card>
      <div className="p-4">
      <Card className="flex flex-col p-4 bg-white rounded-lg shadow-md">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              {/* 
              <Table.HeadCell>Id</Table.HeadCell> 
              */}
              <Table.HeadCell> Name </Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Order</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {customerList.map((customer, idx) => (
                
                <Table.Row key={idx}>
                  <Table.Cell>
                    <Link href={`/customers/${customer.id}`}>
                      <span className="text-blue-400">
                        <svg className="w-6 h-6 hover:text-gray-800 text-gray-300 dark:text-white hover:text-blue-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"/>
                          <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                        </svg>
                      </span>
                    </Link>
                    <Link href={`/customers/${customer.id}?editMode=true`}>
                        <span className="text-blue-400">
                          <svg className="w-6 h-6 hover:text-gray-800 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"/>
                          </svg>
                        </span>
                    </Link>
                  </Table.Cell>
                  {/* 
                  <Table.Cell>
                    {customer.id}
                  </Table.Cell> 
                  */}
                  <Table.Cell>{customer.last_name}, {customer.first_name}</Table.Cell>
                  <Table.Cell>{customer.email}</Table.Cell>
                  <Table.Cell>{customer.phone_number}</Table.Cell>
                  <Table.Cell>
                    <p>{customer.shipping_addresses[0]?.street || 0}</p>
                    <p>{customer.shipping_addresses[0]?.city || 0}, {customer.shipping_addresses[0]?.zip_code || 0} {/* , {customer.shipping_addresses[0]?.country || 0} */} </p>
                  </Table.Cell>
                  <Table.Cell>
                      
                    {customer.prints && customer.prints.length > 0 && (
                      <Badge className="bg-none text-gray-800 text-xxs font-light me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-300">print</Badge>
                    )}
                    {customer.scans && customer.scans.length > 0 && (
                      <Badge className="bg-none text-gray-800 text-xxs font-light me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-300">scan</Badge>
                    )}
                    {customer.frames && customer.frames.length > 0 && (
                      <Badge className="bg-none text-gray-800 text-xxs font-light me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-300">frame</Badge>
                    )}
                  </Table.Cell>
                </Table.Row>
                 
              ))}
            </Table.Body>
          </Table>
        </div>
        
      </Card>
      <div>
            <Accordion collapseAll>
                <Accordion.Panel>
                    <Accordion.Title>Add Customer</Accordion.Title>
                    <Accordion.Content>
                      
                        <AddCustomer customer={null}/>
                      
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    </div>
      </div>      
  );
}
"use client";

import { Table, Card, List, Accordion } from "flowbite-react";
import AddCustomer from '../components/AddCustomer';
import {useEffect, useState,} from 'react';
import Link from 'next/link'

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
      

    }catch(err){
      console.log('error fetching customer data', err)
    }
   
  }

  useEffect(()=> {
    getCustomerData();
  }, []);


  return (
    <> <Card className="m-4 bg-amber-200">
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
      <div className="p-4 w-full">
      <Card className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell></Table.HeadCell>
              <Table.HeadCell>Id</Table.HeadCell>
              <Table.HeadCell>Last name</Table.HeadCell>
              <Table.HeadCell>First name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone</Table.HeadCell>
              <Table.HeadCell>Street</Table.HeadCell>
              <Table.HeadCell>City</Table.HeadCell>
              <Table.HeadCell>Zip</Table.HeadCell>
              <Table.HeadCell>Country</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {customerList.map((customer, idx) => (
                <Table.Row key={idx}>
                  <Table.Cell>
                  <Link href={`/customers/${customer.id}`}><span className="text-blue-400">View</span></Link>
                  </Table.Cell>
                  <Table.Cell>
                    {customer.id}
                  </Table.Cell>
                  <Table.Cell>{customer.last_name}</Table.Cell>
                  <Table.Cell>{customer.first_name}</Table.Cell>
                  <Table.Cell>{customer.email}</Table.Cell>
                  <Table.Cell>{customer.phone_number}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0]?.street || 0}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0]?.city || 0}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0]?.zip_code || 0}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0]?.country || 0}</Table.Cell>
                  
                  <Table.Cell>
                    <Link href={`/customers/${customer.id}?editMode=true`}>
                      Edit
                    </Link>
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
      </>      
  );
}
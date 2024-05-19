"use client";

import { useState, useEffect } from "react";
import {Card, Table } from 'flowbite-react';

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
      const res = await fetch('http://127.0.0.1:8000/customers/');
      // The return value is *not* serialized
      // You can return Date, Map, Set, etc.
     
      if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data');
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
    <>
      <div className="p-4 w-full">
      <Card className="flex flex-col w-full p-4 bg-white border border-gray-200 rounded-lg shadow">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
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
                  </Table.Cell>
                  <Table.Cell>{customer.last_name}</Table.Cell>
                  <Table.Cell>{customer.first_name}</Table.Cell>
                  <Table.Cell>{customer.email}</Table.Cell>
                  <Table.Cell>{customer.phone_number}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0].street}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0].city}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0].zip_code}</Table.Cell>
                  <Table.Cell>{customer.shipping_addresses[0].country}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
      </>      
  );
}

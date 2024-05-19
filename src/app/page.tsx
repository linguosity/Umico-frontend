"use client";

import { Table, Card } from "flowbite-react";
import {useEffect, useState} from 'react';
import Customers from './components/Customers'

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
    <Customers />
  );
}

"use client";

import { Checkbox, Sidebar, Table, Card } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from "react-icons/hi";
import {useEffect, useState} from 'react';

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
      <aside>
        <Sidebar id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <Sidebar.Items className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <Sidebar.ItemGroup className="space-y-2 font-medium">
              <Sidebar.Item href="#" icon={HiChartPie} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                Dashboard
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                Active Orders
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiInbox}>
                Frames
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiUser}>
                Prints
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiShoppingBag}>
                Scans
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiArrowSmRight}>
                Customers
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiTable}>
                Sign Up
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item href="#" icon={HiChartPie}>
                Upgrade to Pro
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={HiViewBoards}>
                Documentation
              </Sidebar.Item>
              <Sidebar.Item href="#" icon={BiBuoy}>
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </aside>

      <div className="p-4 sm:ml-64">
      <Card className="flex flex-col w-full p-6 bg-white border border-gray-200 rounded-lg shadow">
        <div className="overflow-x-auto">
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>
                <Checkbox />
              </Table.HeadCell>
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
                    <Checkbox />
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

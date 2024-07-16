// components/Navbar.tsx

'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Dashboard from "../components/Dashboard";
import Image from 'next/image';
import { Spinner, Dropdown, Modal, Button } from "flowbite-react";
import AddFrame from '../components/AddFrame';
import AddPrint from '../components/AddPrint';
import AddScan from '../components/AddScan';
import AddMisc from '../components/AddMisc';
import { Customer } from '../types/customer';
import CustomerSelection from '../components/CustomerSelection';
import AddCustomer from '../components/AddCustomer';

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Customer[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [orderStep, setOrderStep] = useState<number>(1);
  const [showNewCustomerForm, setShowNewCustomerForm] = useState(true);
  console.log('showNewCustomerForm:', showNewCustomerForm); // Add this line

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    if (query.trim()) {
      try {
        const token = process.env.NEXT_PUBLIC_API_TOKEN;
        console.log('Using token:', token); // Debugging line
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/search/?search=${query}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            }
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Customer[] = await response.json();
        setResults(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setResults([]);
    }
    setIsSearching(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const toggleModal = (content: string | null) => {
    setModalContent(content);
    if (content === null) {
      // Only reset when closing the modal
      setOrderStep(1);
      setSelectedCustomer(null);
      setShowNewCustomerForm(true); // Set it back to true when closing
    } else {
      // When opening a new modal, don't change showNewCustomerForm
      setOrderStep(1);
      setSelectedCustomer(null);
    }
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOrderStep(2);
  };

  const handleCreateNewCustomer = () => {
    setShowNewCustomerForm(true);
  };

  const handleNewCustomerSubmit = (newCustomer: Customer) => {
    setSelectedCustomer(newCustomer);
    setOrderStep(2);
  };

  return (
    <nav className="isolate sticky top-0 z-50 w-full bg-amber-200 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <div className="relative w-32 h-20">
              <Image
                src="https://images.squarespace-cdn.com/content/v1/5a8749aff09ca4823e25c813/1582321464833-N5TD3V5GOWYXVCLKZK3A/Umi+Logo.png?format=1500w"
                alt="Umi Logo"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
            <Dashboard />

            {/* New Order Creation Dropdown */}
            <Dropdown label="Create New Order" className="mx-2" color="gray">
              <Dropdown.Item onClick={() => toggleModal('frame')}>New Frame Order</Dropdown.Item>
              <Dropdown.Item onClick={() => toggleModal('print')}>New Print Order</Dropdown.Item>
              <Dropdown.Item onClick={() => toggleModal('scan')}>New Scan Order</Dropdown.Item>
              <Dropdown.Item onClick={() => toggleModal('misc')}>New Misc Order</Dropdown.Item>
            </Dropdown>

          </div>
          
          <div className="flex items-center relative">
            <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input 
                  type="search" 
                  id="default-search" 
                  className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                  placeholder="Search customers..." 
                  value={searchQuery}
                  onChange={handleInputChange}
                  required
                  autoComplete="off"
                />
                {isSearching && (
                  <div className="absolute end-2.5 bottom-2.5">
                    <Spinner aria-label="Searching..." />
                  </div>
                )}
              </div>
              {results.length > 0 ? (
                <div className="absolute bg-white w-full shadow-lg z-50 mt-2 rounded-lg">
                  <ul>
                    {results.map((result) => (
                      <li key={result.id} className="p-4 border-b hover:bg-gray-100">
                        <Link href={`/customers/${result.id}`}>
                          {result.first_name} {result.last_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (searchQuery.trim() !== '' && !results.length) ? (
                <div className="absolute bg-white w-full shadow-lg z-50 mt-2 rounded-lg">
                  <ul>
                    <li className="p-4 border-b hover:bg-gray-100">
                      <span>No results</span>
                    </li>
                  </ul>
                </div>
              ) : null}
            </form>

            {/* <div className="flex items-center ms-3">
              <div>
                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                  <span className="sr-only">Open user menu</span>
                  <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo" />
                </button>
              </div>
              <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                <div className="px-4 py-3" role="none">
                  <p className="text-sm text-gray-900 dark:text-white" role="none">
                    Neil Sims
                  </p>
                  <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul className="py-1" role="none">
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Dashboard</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Settings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Earnings</a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white" role="menuitem">Sign out</a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Modal for new orders */}
      
        <Modal
        show={!!modalContent}
        position="center"
        onClose={() => toggleModal(null)}
        dismissible
        size={'4xl'}
        className={`bg-opacity-20 backdrop-blur-sm modal-backdrop ${!!modalContent ? 'show' : ''}`}
      >
        <Modal.Header>
          {orderStep === 1 && 'Select or Create Customer'}  
          {orderStep === 2 && modalContent === 'frame' && 'New Frame Order'}
          {orderStep === 2 && modalContent === 'print' && 'New Print Order'}
          {orderStep === 2 && modalContent === 'scan' && 'New Scan Order'}
          {orderStep === 2 && modalContent === 'misc' && 'New Misc Order'}
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6 p-6">
            {orderStep === 1 && (
              <>
                <CustomerSelection 
                  onSelect={handleCustomerSelect} 
                  onCreateNew={handleCreateNewCustomer}
                />
                <hr className="my-6 border-gray-300" />

              {console.log('Rendering customer form section, showNewCustomerForm:', showNewCustomerForm)}
                {showNewCustomerForm ? (
                  <AddCustomer 
                    customer={null} 
                    onSubmit={handleNewCustomerSubmit}
                  />
                ) : (
                  <Button onClick={handleCreateNewCustomer} color="light">
                    Create New Customer
                  </Button>
                )}
              </>
            )}
            {orderStep === 2 && (
              <>
                {modalContent === 'frame' && <AddFrame id={selectedCustomer?.id ?? -1} />}
                {modalContent === 'print' && <AddPrint id={selectedCustomer?.id ?? -1} />}
                {modalContent === 'scan' && <AddScan id={selectedCustomer?.id ?? -1} />}
                {modalContent === 'misc' && <AddMisc id={selectedCustomer?.id ?? -1} />}
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </nav>
  );
};

export default Navbar;
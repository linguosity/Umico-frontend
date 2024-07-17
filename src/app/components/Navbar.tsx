// components/Navbar.tsx

'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Dashboard from "../components/Dashboard";
import Image from 'next/image';
import { useAuth } from '../contexts/AuthContext';
import SignIn from './SignIn';
import { Spinner, Dropdown, Modal, Button, Avatar, Navbar as FlowbiteNavbar } from "flowbite-react";
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
  const [showSignInModal, setShowSignInModal] = useState(false);
  const { user, signOut } = useAuth();

  console.log('showNewCustomerForm:', showNewCustomerForm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // Optionally, you can add a notification here that the user has been signed out
    } catch (error) {
      console.error('Sign out failed', error);
      // Optionally, you can add an error notification here
    }
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
      setOrderStep(1);
      setSelectedCustomer(null);
      setShowNewCustomerForm(true);
    } else {
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

            <div className="flex md:order-2 ml-3">
              {user ? (
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar 
                      alt="User settings" 
                      img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
                      rounded 
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{user.username}</span>
                    <span className="block truncate text-sm font-medium">{user.email}</span>
                  </Dropdown.Header>
                  <Dropdown.Item>Dashboard</Dropdown.Item>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
                </Dropdown>
              ) : (
                <Button onClick={() => setShowSignInModal(true)}>Sign In</Button>
              )}
            </div>
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
      
      <SignIn show={showSignInModal} onClose={() => setShowSignInModal(false)} />
    </nav>
  );
};

export default Navbar;
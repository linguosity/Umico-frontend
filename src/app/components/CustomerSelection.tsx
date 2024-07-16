// components/CustomerSelection.tsx

import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'flowbite-react';
import { Customer } from '../types/customer';

interface CustomerSelectionProps {
  onSelect: (customer: Customer) => void;
  onCreateNew: () => void;
}

const CustomerSelection: React.FC<CustomerSelectionProps> = ({ onSelect, onCreateNew }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [results, setResults] = useState<Customer[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    if (query.trim()) {
      try {
        const token = process.env.NEXT_PUBLIC_API_TOKEN;
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
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setResults([]);
    }
    setIsSearching(false);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search customers..."
          value={searchQuery}
          onChange={handleInputChange}
          required
        />
        {isSearching && (
          <div className="absolute end-2.5 bottom-2.5">
            <Spinner aria-label="Searching..." />
          </div>
        )}
      </div>
      {results.length > 0 && (
        <ul className="absolute z-50 mt-1 w-1/3 bg-white border border-gray-200 rounded-lg divide-y divide-gray-200 shadow-lg max-h-60 overflow-auto">
          {results.map((customer) => (
            <li
              key={customer.id}
              className="p-4 hover:bg-gray-100 cursor-pointer"
              onClick={() => onSelect(customer)}
            >
              {customer.first_name} {customer.last_name}
            </li>
          ))}
        </ul>
      )}
      {searchQuery.trim() !== '' && !results.length && !isSearching && (
        <p className="mt-4 text-gray-500">No results found</p>
      )}
      <div className="mt-4">
        <Button onClick={onCreateNew} color="light">
          Create New Customer
        </Button>
      </div>
    </div>
  );
};

export default CustomerSelection;
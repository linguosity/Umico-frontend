"use client";
import React, { Suspense, useState} from 'react';
import Loading from '../../src/app/components/Loading';
import dynamic from 'next/dynamic';

// Dynamically import Customers component
const DynamicCustomers = dynamic(() => import('./components/Customers'), {
  suspense: true,
  loading: () => <Loading />, // Using the loading component
  ssr: false, // Disable SSR if needed
});

export default function Home() {

 
  return (
    <Suspense fallback={<Loading />}>
      <DynamicCustomers />
    </Suspense>
  );
}

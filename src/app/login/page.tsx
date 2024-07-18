'use client'

import { useState, useEffect } from 'react';
import SignIn from '../components/SignIn'
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  console.log('LoginPage component rendered');

  useEffect(() => {
    console.log('LoginPage useEffect triggered');
  }, []);

  const [showModal, setShowModal] = useState(true);
  const router = useRouter();

  const handleClose = () => {
    console.log('Modal close triggered');
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn show={showModal} onClose={handleClose} />
    </div>
  );
}
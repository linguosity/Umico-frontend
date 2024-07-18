'use client'

import { useState, useEffect } from 'react';
import SignIn from '../components/SignIn';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  console.log('LoginPage component rendered');

  const [showModal, setShowModal] = useState(true);
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    console.log('LoginPage useEffect triggered');
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [isLoading, user, router]);

  const handleClose = () => {
    console.log('Modal close triggered');
    router.push('/');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null; // or a loading indicator if you prefer
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn show={showModal} onClose={handleClose} />
    </div>
  );
}
// app/login/page.tsx
'use client'

import { useRouter } from 'next/navigation';
import SignIn from '../components/SignIn';

export default function Login() {
  const router = useRouter();

  const handleClose = () => {
    // Redirect to home page or dashboard when the modal is closed
    router.push('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignIn show={true} onClose={handleClose} />
    </div>
  );
}
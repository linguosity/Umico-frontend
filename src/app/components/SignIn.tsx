'use client'

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Modal, TextInput, Label, Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';

interface SignInProps {
  show: boolean;
  onClose: () => void;
}

const SignIn: React.FC<SignInProps> = ({ show, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(username, password);
      onClose();
      router.push('/dashboard');
    } catch (error) {
      console.error('Sign in failed', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <Modal show={show} onClose={onClose} className={`modal ${show ? 'show' : ''}`}>
      <Modal.Header>Sign In</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <TextInput
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <TextInput
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button 
            type="submit"
            color="blue"
          >
            Sign In
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default SignIn;
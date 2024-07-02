'use client';

import { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import Home from '../app/home/page';
import { verifyToken } from '../../utils/auth';

const Index = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    console.log('on useEffect!');
    const token = getCookie('token');
    if (token) {
      try {
        const decodedToken = verifyToken(token);
        if(decodedToken) {
          setUser(decodedToken.sub);
        } else {
          router.push(`/login?error=${encodeURIComponent('Invalid Token!')}`);
        }
      } catch (err) {
        console.error('Token verification failed', err);
        router.push(`/login?error=${encodeURIComponent('Your Token session is expired, Please log in again')}`); // Redirect to login if token is invalid
      }

      console.log(user);
    } else {
      console.log('on else useEffect')
      router.push(`/login?error=${encodeURIComponent('Please log in')}`);
    }
  }, [router]);



  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Home user={user} />
  );
};

export default Index;
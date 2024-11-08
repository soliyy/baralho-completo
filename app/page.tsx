'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ContextoAutenticacao as AuthContext } from '@context/AuthContext';

import DashboardClient from '@dashboard/DashboardClient';

const Page = () => {
    const { autenticado } = useContext(AuthContext) || {};
  const router = useRouter();

  useEffect(() => {
    if (!autenticado) {
      router.push('/login');
    }
  }, [autenticado, router]);

  if (!autenticado) {
    return null; 
  }

  return (
    <div>
      <DashboardClient />
    </div>
  );
};

export default Page;

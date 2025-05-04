"use client";

import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  hideUserMenu?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, hideUserMenu = false }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header hideUserMenu={hideUserMenu} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useDeviceDetect();

  return (
    <div className={`min-h-screen flex flex-col ${isMobile ? 'mobile-layout' : 'desktop-layout'}`}>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
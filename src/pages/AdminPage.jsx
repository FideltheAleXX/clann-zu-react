import { useEffect, useState } from 'react';
import AdminPanel from '../components/adminPanel/AdminPanel';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import Navigation from '../components/navigation/Navigation';

const AdminPage = () => {
  return (
    <>
      <Header />
      <Navigation />
      <AdminPanel />
      <Footer />
    </>
  );
};
export default AdminPage;

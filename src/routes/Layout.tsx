import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
//import { NavBar } from '../components/general/NavBar';
import { Footer } from '../components/geral/Footer';
import { useEffect } from 'react';
import { Header } from '@/components/geral/Header';

export default function Layout() {
    return (
        <>
            {/*<Header />*/}
            <Outlet />
            {/*<Footer />*/}
        </>
    );
}
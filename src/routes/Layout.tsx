import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
//import { NavBar } from '../components/general/NavBar';
import { Footer } from '../components/geral/Footer';
import { useEffect } from 'react';
import { Header } from '@/components/geral/Header';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.pathname === '/') {
            navigate('/', { replace: true });
        }
        }, [location, navigate]);
        
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
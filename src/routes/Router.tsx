import { Navigate, RouteObject } from "react-router-dom";
import Layout from "./Layout";
import Home from "@/pages/Home";
import Curso from "@/pages/Curso";

export const PublicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/:id', element: <Curso /> },
            //{ path: '/:id/planejamento', element: <Planejamento /> },
            { path: '/', element: <Home/> },
            { path: '*', element: <Navigate to="/" replace /> },
        ]
    }
];
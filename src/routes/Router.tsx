import { Navigate, RouteObject } from "react-router-dom";
import Layout from "./Layout";
import Home from "@/pages/Home";
import Curso from "@/pages/Curso";
import Disciplina from "@/pages/Disciplina";

export const PublicRoutes: RouteObject[] = [
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/graduacao/curso/:id', element: <Curso /> },
            { path: '/graduacao/curso/:idc/disciplina/:idd', element: <Disciplina /> },
            //{ path: '/:id/planejamento', element: <Planejamento /> },
            { path: '/graduacao/', element: <Home/> },
            { path: '*', element: <Navigate to="/graduacao/" replace /> },
        ]
    }
];
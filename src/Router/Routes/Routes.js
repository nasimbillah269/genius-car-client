import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Checkout from "../../Pages/Checkout/Checkout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivetRoute from "../PrivetRoute/PrivetRoute";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            },
            {
                path: '/checkout/:id',
                element: <PrivetRoute><Checkout></Checkout></PrivetRoute>,
                loader: ({ params }) => fetch(`https://genius-car-server-coral.vercel.app/services/${params.id}`),
            },
            {
                path: '/orders',
                element: <PrivetRoute> <Orders></Orders></PrivetRoute>
            }
        ]
    }

])
export default router;
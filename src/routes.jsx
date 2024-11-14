import React, {ReactDOM} from "react";
import App from './App';
import Response from './Response';

const routes =[
    {
        path: "/",
        element: <App/>
    },
    {
        path:"/response",
        element: <Response/>
    },
    {
        path:"*",
        element: <Error/>
    }
]


export default routes

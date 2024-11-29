import React, {ReactDOM} from "react";
import App from './App';
import Response from './Response';


const routes =[
    {
        path:"/response",
        element: <Response/>
    },
    {
        path: "/",
        element: <App/>
    },
    {
        path:"*",
        element: <Error/>
    }
]


export default routes

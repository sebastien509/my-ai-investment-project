import React from "react";
import { Chart } from "chart.js";



function response({completion}){
    return(
        <div className="response-page">
         {completion && 
          <div className="response" >
        <h3>Your Personalized Plan</h3>
        <>{completion.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}</>
        </div>}
       </div>
    )
   

}

export default response
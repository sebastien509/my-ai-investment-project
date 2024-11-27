import React from "react";


function response({planData}){
    return(
        <div className="response-page">
         {planData && 
          <div className="response" >
        <h3>Your Personalized Plan</h3>
        <>{planData.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}</>
        </div>}
       </div>
    )
   

}

export default response
import React from "react";
import GraphPrompt from "./GraphPrompt";


function response({planData, graphData}){
    return(
        <div className="response-page">
         {planData && 
          <div className="response" >
        <h3>Your Personalized Plan</h3>
        <>{planData.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}</>
      {graphData && <GraphPrompt res={graphData} />}

        </div>}
       </div>
    )
   

}

export default response
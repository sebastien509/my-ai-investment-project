import React from "react";
import GraphPrompt from "./GraphPrompt";
import './response.css';

function response({planData, graphData}){
  return (
    <div className="response-page">
      {planData && (
        <div className="response">
          <h3>Your Personalized Plan</h3>
          <div className="plan-data">
            {planData.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
          {graphData && <GraphPrompt res={graphData} />}
        </div>
      )}
    </div>
  );
}


export default response
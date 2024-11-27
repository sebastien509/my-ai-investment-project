import React, { useState } from 'react';
import Form from './Form';
import GraphPrompt from './GraphPrompt';

function App() {
  const [formData, setFormData] = useState({
    age: '',
    savings: '',
    goal: '',
    salary: '',
  });

  const [planData, setPlanData] = useState(null);
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      // Step 1: Save Form Data
      const saveFormDataResponse = await fetch('http://localhost:3000/plans', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!saveFormDataResponse.ok) throw new Error('Failed to save form data.');
      const savedData = await saveFormDataResponse.json();
  
      const resourceId = savedData.id;
      if (!resourceId) throw new Error('No ID returned from the server.');
  
      // Step 2: Fetch AI-generated Financial Plan
      const planResponse = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Create a strategic and personalized financial plan for: Age: ${formData.age}, Savings: ${formData.savings}, Goal: ${formData.goal}, Salary: ${formData.salary}.`,
        }),
      });
  
      if (!planResponse.ok) throw new Error('Failed to fetch AI financial plan.');
      const planData = await planResponse.json();
      setPlanData(planData.completion);
  
      // Step 3: Update Local JSON with AI Response
      await fetch(`http://localhost:3000/plans/${resourceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: planData.completion }),
      });
  
      // Step 4: Fetch AI-Generated Graph Data
      const graphResponse = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Using the response here: ${planData.completion}.create a personalized chart values - Only give the values of the keys similar to this setup "{
  "investmentGrowth": {
    "labels": ["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"],
    "data": [1000, 1500, 2000, 3000, 5000]
  },
  "houseBuyingPlan": {
    "labels": ["Salary", "Savings", "Investments"],
    "data": [50000, 20000, 10000],
    "timeline": ["Year 1", "Year 2", "Year 3", "Year 4"]
  },
  "retirementPlans": {
    "labels": ["Age 30", "Age 40", "Age 50", "Age 60"],
    "data": [10000, 50000, 120000, 300000]
  }
}"-  DO NOT REPEAT THE PROMPT.  Generate a json file enclosed in a curly bracket - 3  chart values for keys "labels" and "databases" for investment, buying a house, and retirement. Data points for a financial growth chart. Additional details: Age: ${formData.age}, Savings: ${formData.savings}, Goal: ${formData.goal}, Salary: ${formData.salary}.`,
        }),
      });
  
      if (!graphResponse.ok) throw new Error('Failed to fetch graph data.');
      const graphData = await graphResponse.json();
      setGraphData(graphData.completion);
  
      // Step 5: Save Graph Data
      await fetch(`http://localhost:3000/plans/${resourceId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ graphs: graphData.completion }),
      });
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="main">
      <h1>Plan Your Future</h1>
      <Form onSubmit={handleFormSubmit} formData={formData} setFormData={setFormData} />
      {loading && <p>Loading...</p>}
      {planData && <div><h2>Your Financial Plan</h2><p>{planData}</p></div>}
      {graphData && <GraphPrompt res={graphData} />}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import FinancialForm from './FinancialForm';
import Response from './Response';
import GraphPrompt from './GraphPrompt';

function App() {
  const [formData, setFormData] = useState({
    age: "",
    location: "",
    maritalStatus: "",
    dependents: "",
    currentIncome: "",
    expenses: "",
    debt: "",
    savingsRate: "",
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
          prompt: `Create a strategic and personalized financial plan for an individual looking to achieve a successful and stable economic future. Use the following information to tailor a plan for investments, house buying, and retirement:

- **Personal Information**:
  - Age: ${formData.age}
  - Location: ${formData.location}
  - Marital Status: ${formData.maritalStatus}
  - Dependents: ${formData.dependents}

- **Income and Financial Overview**:
  - Current Monthly Income: $${formData.currentIncome}
  - Total Monthly Expenses: $${formData.expenses}
  - Debt: $${formData.debt}
  - Savings Rate: ${formData.savingsRate}% of monthly income

Consider this individual's current financial situation, priorities, and goals. Provide:
1. **Investment Strategy**: Recommendations for diversifying and optimizing investments based on income, savings rate, and risk tolerance.
2. **House Buying Plan**: A step-by-step guide to saving for a house, including budgeting, down payment goals, and an ideal timeline for buying based on their current financial state.
3. **Retirement Plan**: A detailed plan for retirement savings, including target savings benchmarks, potential growth, and strategies to achieve their desired retirement lifestyle.

Ensure the plan is realistic, actionable, and future-proof, taking into account potential career growth and life changes. Use practical financial principles to create a clear roadmap for financial success.`,

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
    "labels": ["y", "y ", "y ", "y ", "y "...],
    "data": [x, x, x, x, x...]
  },
  "houseBuyingPlan": {
    "labels": ["y", "y", "y"...],
    "data": [x, x, x...],
    "timeline": [" x  ", " x", " x", " x"...]
  },
  "retirementPlans": {
    "labels": ["Age x", "Age x", "Age x", "Age x"...],
    "data": [x, x, , x...]
  }
}"-  DO NOT REPEAT THE PROMPT.  Generate a json file enclosed in a curly bracket - 3  chart values for keys "labels" and "databases" for investment, buying a house, and retirement. Data points for a financial growth chart. Additional details:  **Personal Information**:
  - Age: ${formData.age}
  - Location: ${formData.location}
  - Marital Status: ${formData.maritalStatus}
  - Dependents: ${formData.dependents}

- **Income and Financial Overview**:
  - Current Monthly Income: $${formData.currentIncome}
  - Total Monthly Expenses: $${formData.expenses}
  - Debt: $${formData.debt}
  - Savings Rate: ${formData.savingsRate}% of monthly income`,
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
      console.error("Error during form submission:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <FinancialForm formData={formData} setFormData={setFormData} onSubmit={handleFormSubmit} />
      {loading && <p>Loading...</p>}
      {planData && <Response  planData={planData}  graphData={graphData}/>}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import Form from './Form';
import Response from './Response';
import SideBarList from './SideBarList';
import { Routes, Route, useNavigate } from 'react-router';
import { Outlet } from 'react-router';

const fetchCompletion = async (prompt) => {
  try {
    const response = await fetch('http://localhost:3001/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }), // Sending the prompt
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Your personalized Plan:', data.completion);
      return data.completion;
    } else {
      console.error('Error fetching completion:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Failed to fetch:', error);
    return null;
  }
};

function App() {
  const [completion, setCompletion] = useState('');
  const navigate = useNavigate();  // Moved useNavigate here

  const handleFormSubmit = async (formData) => {
    const prompt = `Do not repeat the prompt - as investment and retirement expert- Write a thorough financial plan for an individual of age: ${formData.age},with current savings of : ${formData.savings}, goal: ${formData.goal} to achieve before retirement age (65),and a current salary with a 10% expected growth every 10 years: ${formData.salary}`;
    
    const result = await fetchCompletion(prompt);
    if (result) {
      setCompletion(result);
      navigate('/my-plan');  // Use navigate here directly
    }
  };

  return (
    <div className="App">
      <SideBarList/>
      <section className="main">
        <h1>Planning your Future</h1>
        
        <Form onSubmit={handleFormSubmit} />
        <Response completion={completion}/>
      </section>
    </div>
  );
}

export default App;

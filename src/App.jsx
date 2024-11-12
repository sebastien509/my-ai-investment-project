import React, { useState } from 'react';
import './App.css';
import Form from './Form';

const fetchCompletion = async (prompt) => {
  try {
    const response = await fetch('http://localhost:3000/api/generate', {
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

  const handleFormSubmit = async (formData) => {
    const prompt = `Financial advice for age: ${formData.age}, savings: ${formData.savings}, goal: ${formData.goal}, salary: ${formData.salary}`;
    const result = await fetchCompletion(prompt);
    if (result) {
      setCompletion(result);
    }
  };

  return (
    <div className="App">
      <aside className="side-bar">
        <h1>Financial plans ready for you</h1>
        <section className="graph-list">
          <div>
            <img
              src="https://th.bing.com/th/id/R.bb3eb6c3414d90b89424b1162282d75a?rik=rPGmkNvMelv0iw&riu=http%3a%2f%2fwww.publicdomainpictures.net%2fpictures%2f40000%2fvelka%2fgraph.jpg&ehk=ryE44Xh84Rp6yeIcMKZoDQWWKtDcXKFSJfIgXj7%2bg%2fE%3d&risl=&pid=ImgRaw&r=0"
              alt="graph"
            />
          </div>
        </section>
      </aside>
      <section className="main">
        <h1>Planning your Future</h1>
        <Form onSubmit={handleFormSubmit} />
        {completion && <div className="completion-result"><h3>Your Personalized Plan</h3><p>{completion}</p></div>}
      </section>
    </div>
  );
}

export default App;

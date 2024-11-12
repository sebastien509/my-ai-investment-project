// Form.jsx
import React, { useState } from 'react';

function Form({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: '',
    savings: '',
    goal: '',
    salary: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);  // Pass form data to the parent component
  };

  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <div className="form-group">
        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="savings">Savings</label>
        <input
          type="number"
          id="savings"
          name="savings"
          value={formData.savings}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="goal">Goal</label>
        <input
          type="text"
          id="goal"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="salary">Yearly Salary</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Get Financial Plan</button>
    </form>
  );
}

export default Form;

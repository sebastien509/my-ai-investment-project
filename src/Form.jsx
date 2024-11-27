import React, { useState } from 'react';

function Form({ onSubmit, formData, setFormData }) {
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass form data to App
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <div>
        <label>Age</label>
        <input
          className='form-group'
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Savings</label>
        <input
        className='form-group'
          type="number"
          name="savings"
          value={formData.savings}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Goal</label>
        <input
        className='form-group'
          type="text"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Yearly Salary</label>
        <input
        className='form-group'
          type="number"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Generate Plan</button>
    </form>
  );
}

export default Form;

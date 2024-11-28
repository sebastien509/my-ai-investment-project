import React from "react";

const FinancialForm = ({ formData, setFormData, onSubmit }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    onSubmit(formData);  // Use the passed onSubmit function to handle submission
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", fontFamily: "Arial" }}>
      <h2>Personalized Financial Plan Form</h2>
      <form className="financial-form" onSubmit={handleSubmit}>
        {/* Personal Information */}
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Marital Status:
          <select
            name="maritalStatus"
            value={formData.maritalStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select...</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Dependents:
          <input
            type="number"
            name="dependents"
            value={formData.dependents}
            onChange={handleChange}
          />
        </label>

        {/* Income and Financial Overview */}
        <label>
          Current Monthly Income ($):
          <input
            type="number"
            name="currentIncome"
            value={formData.currentIncome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Monthly Expenses ($):
          <input
            type="number"
            name="expenses"
            value={formData.expenses}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Debt (Total $):
          <input
            type="number"
            name="debt"
            value={formData.debt}
            onChange={handleChange}
          />
        </label>
        <label>
          Savings Rate (% of Income):
          <input
            type="number"
            name="savingsRate"
            value={formData.savingsRate}
            onChange={handleChange}
          />
        </label>

        <button className="submit-btn" type="submit" style={{ marginTop: "20px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default FinancialForm;

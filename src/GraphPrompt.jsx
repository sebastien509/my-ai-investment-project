import React, { useEffect, useState } from 'react';
import {
  Chart,
  LineController,
  LineElement,
  BarController,
  BarElement,
  RadarController,
  PointElement,
  LinearScale,
  RadialLinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register necessary Chart.js components
Chart.register(
  LineController,
  LineElement,
  BarController,
  BarElement,
  RadarController,
  PointElement,
  LinearScale,
  RadialLinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

const GraphPrompt = ({ res }) => {
  const [error, setError] = useState(null);

  const initializeCharts = (parsedData) => {
    // Get canvas elements dynamically
    const investmentGrowthCanvas = document.getElementById('investmentGrowthChart');
    const houseBuyingPlanCanvas = document.getElementById('houseBuyingPlanChart');
    const retirementPlansCanvas = document.getElementById('retirementPlansChart');

    // Clear existing canvas contents by replacing the canvas elements
    investmentGrowthCanvas.replaceWith(investmentGrowthCanvas.cloneNode());
    houseBuyingPlanCanvas.replaceWith(houseBuyingPlanCanvas.cloneNode());
    retirementPlansCanvas.replaceWith(retirementPlansCanvas.cloneNode());

    // Get the new cloned elements
    const newInvestmentGrowthCanvas = document.getElementById('investmentGrowthChart');
    const newHouseBuyingPlanCanvas = document.getElementById('houseBuyingPlanChart');
    const newRetirementPlansCanvas = document.getElementById('retirementPlansChart');

    // Initialize Investment Growth Chart
    new Chart(newInvestmentGrowthCanvas, {
      type: 'line',
      data: {
        labels: parsedData.investmentGrowth.labels,
        datasets: [
          {
            label: 'Investment Growth',
            data: parsedData.investmentGrowth.data,
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
    });

    // Initialize House Buying Plan Chart
    new Chart(newHouseBuyingPlanCanvas, {
      type: 'bar',
      data: {
        labels: parsedData.houseBuyingPlan.labels,
        datasets: [
          {
            label: 'House Buying Plan',
            data: parsedData.houseBuyingPlan.data,
            backgroundColor: 'green',
          },
        ],
      },
    });

    // Initialize Retirement Plans Chart
    new Chart(newRetirementPlansCanvas, {
      type: 'radar',
      data: {
        labels: parsedData.retirementPlans.labels,
        datasets: [
          {
            label: 'Retirement Plans',
            data: parsedData.retirementPlans.data,
            borderColor: 'orange',
            fill: true,
          },
        ],
      },
    });
  };

  useEffect(() => {
    try {
      const parsedData = JSON.parse(res);
      initializeCharts(parsedData);
    } catch (err) {
      setError('Failed to parse API response: ' + err.message);
    }
  }, [res]);

  return (
    <div>
      <h2>Graph Data from API</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <canvas id="investmentGrowthChart"></canvas>
      <canvas id="houseBuyingPlanChart"></canvas>
      <canvas id="retirementPlansChart"></canvas>
    </div>
  );
};

export default GraphPrompt;

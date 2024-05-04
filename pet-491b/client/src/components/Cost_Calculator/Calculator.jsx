// Import necessary React hooks and styles
import React, { useState, useEffect, useRef } from "react";
import styles from "./Calculator.module.css";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart component
import "chart.js/auto"; // This import is necessary for Chart.js 3.x and later

function Calculator() {
  const chartRef = useRef(null);
  const [petType, setPetType] = useState("");
  const [petDetails, setPetDetails] = useState({
    breed: "",
    size: "",
    foodCost: 0,
    groomingCost: 0,
    vetCost: 0,
    additionalCosts: 0,
  });
  const [breeds, setBreeds] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const breedOptions = {
    Dog: [
      { name: "Golden Retriever", additionalCost: 200 },
      { name: "Labrador Retriever", additionalCost: 180 },
      { name: "French Bulldog", additionalCost: 220 },
    ],
    Cat: [
      { name: "Siamese", additionalCost: 150 },
      { name: "Persian", additionalCost: 170 },
      { name: "Maine Coon", additionalCost: 190 },
    ],
  };

  useEffect(() => {
    if (petType && breedOptions[petType]) {
      setBreeds(breedOptions[petType]);
      setPetDetails((prevDetails) => ({ ...prevDetails, breed: "" }));
    } else {
      setBreeds([]);
      setPetDetails((prevDetails) => ({ ...prevDetails, breed: "" }));
    }
  }, [petType]);

  const calculateCosts = () => {
    if (!petType || !petDetails.breed || !petDetails.size) {
      setError("Please provide all required details.");
      return;
    }
    setError("");
    let baseAnnualCost = 1000;
    const breedCost = breeds.find((b) => b.name === petDetails.breed)?.additionalCost || 0;
    const totalAnnualCost = baseAnnualCost + breedCost + parseFloat(petDetails.foodCost) + parseFloat(petDetails.groomingCost) + parseFloat(petDetails.vetCost) + parseFloat(petDetails.additionalCosts);
    const monthlyCost = totalAnnualCost / 12;
    const expectedLifeSpan = calculateLifeExpectancy(petType, petDetails.size);
    const lifetimeCost = totalAnnualCost * expectedLifeSpan;

    const chartData = {
      labels: ["Food", "Grooming", "Vet", "Additional Costs", "Base Cost"],
      datasets: [
        {
          label: "Cost Breakdown",
          data: [
            petDetails.foodCost,
            petDetails.groomingCost,
            petDetails.vetCost,
            petDetails.additionalCosts,
            baseAnnualCost,
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
    setResult({ annualCost: totalAnnualCost, monthlyCost, lifetimeCost, chartData });
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Cost Breakdown in Pie Chart",
        font: { size: 40, family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", weight: "bold" },
        color: "#333",
        padding: { top: 20, bottom: 30 },
      },
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { size: 13, family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif" },
          color: "#444",
        },
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
        bodyFont: { size: 16 },
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: { size: 16, weight: "bold" },
        callbacks: {
          label: function (context) {
            let label = context.label;
            let value = context.parsed;
            return `${label}: $${value.toFixed(2)}`;
          },
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
    },
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: { left: 10, right: 10, top: 0, bottom: 0 },
    },
  };

  const calculateLifeExpectancy = (petType, size) => {
    if (petType === "Dog") {
      return size === "Large" ? 10 : 15;
    } else if (petType === "Cat") {
      return 18;
    }
    return 5; // Default for 'Other' pets
  };

  const downloadResults = () => {
    if (!result) return; // Ensure there are results to download

    // Text file content
    const content = `Pet Ownership Cost Estimate:
Pet Type: ${petType}
Breed: ${petDetails.breed}
Size: ${petDetails.size}
Annual Cost: $${result.annualCost.toFixed(2)}
Monthly Cost: $${result.monthlyCost.toFixed(2)}
Lifetime Cost: $${result.lifetimeCost.toFixed(2)}
`;

    // Create a Blob from the text file content
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });

    // Create a download link for the text file
    const textLink = document.createElement("a");
    textLink.href = URL.createObjectURL(blob);
    textLink.download = "pet_ownership_cost_estimate.txt";
    document.body.appendChild(textLink);
    textLink.click();
    document.body.removeChild(textLink);

    // Check if the chart is available and download as an image
    if (chartRef.current) {
      const url = chartRef.current.toBase64Image();
      const imageLink = document.createElement("a");
      imageLink.href = url;
      imageLink.download = "pet_cost_breakdown_chart.png";
      document.body.appendChild(imageLink);
      imageLink.click();
      document.body.removeChild(imageLink);
    }
  };

  // JSX for rendering the Calculator component
  return (
    <div className={styles.calculator}>
      <h2 className={styles.h1}>Pet Ownership Cost Calculator</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div>
        <label className={styles.label}>Pet Type:</label>
        <select value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select Pet Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label className={styles.label}>Breed:</label>
        <select value={petDetails.breed} onChange={(e) => setPetDetails({...petDetails, breed: e.target.value})}>
          <option value="">Select Breed</option>
          {breeds.map((breed) => <option key={breed.name} value={breed.name}>{breed.name}</option>)}
        </select>
      </div>
      <div>
        <label className={styles.label}>Size:</label>
        <select value={petDetails.size} onChange={(e) => setPetDetails({...petDetails, size: e.target.value})}>
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
      <div>
        <label className={styles.label}>Monthly Food Cost ($):</label>
        <input type="number" value={petDetails.foodCost} onChange={(e) => setPetDetails({...petDetails, foodCost: parseFloat(e.target.value)})} placeholder="Food Cost" />
      </div>
      <div>
        <label className={styles.label}>Annual Grooming Cost ($):</label>
        <input
          type="number"
          value={petDetails.groomingCost}
          onChange={(e) => setPetDetails({...petDetails, groomingCost: parseFloat(e.target.value)})}
          placeholder="Grooming Cost"
        />
      </div>
      <div>
        <label className={styles.label}>Annual Vet Cost ($):</label>
        <input
          type="number"
          value={petDetails.vetCost}
          onChange={(e) => setPetDetails({...petDetails, vetCost: parseFloat(e.target.value)})}
          placeholder="Vet Cost"
        />
      </div>
      <div>
        <label className={styles.label}>Annual Additional Costs ($):</label>
        <input
          type="number"
          value={petDetails.additionalCosts}
          onChange={(e) => setPetDetails({...petDetails, additionalCosts: parseFloat(e.target.value)})}
          placeholder="Additional Costs"
        />
      </div>
      <button onClick={calculateCosts} className={styles.calculateButton}>
        Calculate
      </button>
      {/* Conditionally render the results section if results are present */}
      {result && (
        <div className={styles.results}>
          <p>Annual Cost: ${result.annualCost.toFixed(2)}</p>
          <p>Monthly Cost: ${result.monthlyCost.toFixed(2)}</p>
          <p>Lifetime Cost: ${result.lifetimeCost.toFixed(2)}</p>
          <button onClick={downloadResults} className={styles.downloadButton}>
            Download Estimate
          </button>
          {/* Render the pie chart if result and chartData are available */}
          {result.chartData && (
            <div className={styles.chartContainer}>
              <Doughnut
                data={result.chartData}
                options={chartOptions}
                ref={chartRef}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Calculator;



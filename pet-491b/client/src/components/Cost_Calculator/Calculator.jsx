// Import necessary React hooks and styles
import React, { useState, useEffect, useRef } from "react";
import styles from "./Calculator.module.css";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut chart component
import "chart.js/auto"; // This import is necessary for Chart.js 3.x and later

// Define the Calculator component
function Calculator() {
  // Ref to access the chart DOM element
  const chartRef = useRef(null);
  // State for selecting pet type
  const [petType, setPetType] = useState("");
  // State for storing details about the pet
  const [petDetails, setPetDetails] = useState({
    breed: "",
    size: "",
    foodCost: 0,
    groomingCost: 0,
    vetCost: 0,
    additionalCosts: 0,
  });
  // State for the list of breeds based on selected pet type
  const [breeds, setBreeds] = useState([]);
  // State for storing the calculation results
  const [result, setResult] = useState(null);
  // State for any error messages
  const [error, setError] = useState("");

  // Predefined breed options with additional costs
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

  // Effect hook to update breeds list and reset breed in petDetails when petType changes
  useEffect(() => {
    if (petType && breedOptions[petType]) {
      setBreeds(breedOptions[petType]);
      setPetDetails((prevDetails) => ({ ...prevDetails, breed: "" }));
    } else {
      setBreeds([]);
      setPetDetails((prevDetails) => ({ ...prevDetails, breed: "" }));
    }
  }, [petType]);

  // Function to calculate total and monthly costs, and lifetime cost of pet ownership
  const calculateCosts = () => {
    if (!petType || !petDetails.breed || !petDetails.size) {
      setError("Please provide all required details.");
      return;
    }
    setError("");
    // Base annual cost for any pet
    let baseAnnualCost = 1000;
    // Additional cost based on breed
    const breedCost =
      breeds.find((b) => b.name === petDetails.breed)?.additionalCost || 0;
    // Total annual cost calculation
    const totalAnnualCost =
      baseAnnualCost +
      breedCost +
      parseFloat(petDetails.foodCost) +
      parseFloat(petDetails.groomingCost) +
      parseFloat(petDetails.vetCost) +
      parseFloat(petDetails.additionalCosts);

    // Monthly cost calculation
    const monthlyCost = totalAnnualCost / 12;
    // Calculate expected life span based on pet type and size
    const expectedLifeSpan = calculateLifeExpectancy(petType, petDetails.size);
    // Calculate lifetime cost
    const lifetimeCost = totalAnnualCost * expectedLifeSpan;

    // Generate chart data for pie chart visualizaiton
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
    // Set the result state with calcualted costs and chart data for rendering
    setResult({
      annualCost: totalAnnualCost,
      monthlyCost,
      lifetimeCost,
      chartData,
    });
  };

  // Options for customizing the appearance and functionality of the chart
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Cost Breakdown in Pie Chart", // Chart title
        font: {
          size: 40,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          weight: "bold",
        },
        color: "#333",
        padding: {
          top: 20,
          bottom: 30,
        },
      },
      legend: {
        display: true, // Show legend
        position: "top", // Legend position
        labels: {
          font: {
            size: 13,
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
          color: "#444",
        },
      },
      tooltip: {
        enabled: true, // Enable tooltips
        mode: "index",
        intersect: false,
        bodyFont: {
          size: 16,
        },
        backgroundColor: "rgba(0,0,0,0.8)",
        titleFont: {
          size: 16,
          weight: "bold",
        },
        // Custom tooltip format to show currency values
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
      duration: 1000, // Animation duration
    },
    responsive: true, // Ensure chart is responsive
    maintainAspectRatio: false, // Allow aspect ratio to change
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    },
  };

  // Function to calculate expected life span of the pet based on its type and size
  const calculateLifeExpectancy = (petType, size) => {
    if (petType === "Dog") {
      return size === "Large" ? 10 : 15;
    } else if (petType === "Cat") {
      return 18;
    } else {
      return 5; // Default for 'Other'
    }
  };

  // Function to download the results as a text file and the chart image
  const downloadResults = () => {
    if (!result) return; // Ensure there are results to download
    const filename = "pet_ownership_cost_estimate.txt";
    // Format content for the text file
    const content = `Pet Ownership Cost Estimate:
Pet Type: ${petType}
Breed: ${petDetails.breed}
Size: ${petDetails.size}
Annual Cost: $${result.annualCost.toFixed(2)}
Monthly Cost: $${result.monthlyCost.toFixed(2)}
Lifetime Cost: $${result.lifetimeCost.toFixed(2)}
`;
    // Create and trigger a download link for the text file
    const element = document.createElement("a");
    const file = new Blob([content], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element); // Required for Firefox
    element.click();
    // Check if the chart reference exists and the current instance is available
    if (chartRef.current) {
      const chartInstance = chartRef.current.chartInstance;
      const url = chartInstance.toBase64Image(); // Get the chart image as a base64-encoded string

      // Create a link and trigger the download
      const imageLink = document.createElement("a");
      imageLink.href = url;
      imageLink.download = "chart.png";
      document.body.appendChild(imageLink); // Required for Firefox
      imageLink.click();
      document.body.removeChild(imageLink); // Clean up
    }
  };

  // Render the calculator UI
  return (
    <div className={styles.calculator}>
    {/* Title of the calculator */}
      <h2 className={styles.h1}>Pet Ownership Cost Calculator</h2>
      {/* Display error message if there is one */}
      {error && <p className={styles.error}>{error}</p>}
       {/* Dropdown to select pet type */}
      <div>
        <label className={styles.label}>Pet Type:</label>
        <select value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select Pet Type</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
          <option value="Other">Other</option>
        </select>
      </div>
      {/* Dropdown to select breed based on the selected pet type */}
      <div>
        <label className={styles.label}>Breed:</label>
        <select
          value={petDetails.breed}
          onChange={(e) =>
            setPetDetails({ ...petDetails, breed: e.target.value })
          }
        >
          <option value="">Select Breed</option>
          {breeds.map((breed) => (
            <option key={breed.name} value={breed.name}>
              {breed.name}
            </option>
          ))}
        </select>
      </div>
         {/* Dropdown to select pet size */}
      <div>
        <label className={styles.label}>Size:</label>
        <select
          value={petDetails.size}
          onChange={(e) =>
            setPetDetails({ ...petDetails, size: e.target.value })
          }
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
      </div>
         {/* Input field for monthly food cost */}
      <div>
        <label className={styles.label}>Monthly Food Cost ($):</label>
        <input
          type="number"
          value={petDetails.foodCost}
          onChange={(e) =>
            setPetDetails({ ...petDetails, foodCost: e.target.value })
          }
          placeholder="Food Cost"
        />
      </div>
      {/* Input field for annual grooming cost */}
      <div>
        <label className={styles.label}>Annual Grooming Cost ($):</label>
        <input
          type="number"
          value={petDetails.groomingCost}
          onChange={(e) =>
            setPetDetails({ ...petDetails, groomingCost: e.target.value })
          }
          placeholder="Grooming Cost"
        />
      </div>
       {/* Input field for annual vet cost */}
      <div>
        <label className={styles.label}>Annual Vet Cost ($):</label>
        <input
          type="number"
          value={petDetails.vetCost}
          onChange={(e) =>
            setPetDetails({ ...petDetails, vetCost: e.target.value })
          }
          placeholder="Vet Cost"
        />
      </div>
         {/* Input field for annual additional costs */}
      <div>
        <label className={styles.label}>Annual Additional Costs ($):</label>
        <input
          type="number"
          value={petDetails.additionalCosts}
          onChange={(e) =>
            setPetDetails({ ...petDetails, additionalCosts: e.target.value })
          }
          placeholder="Additional Costs"
        />
        {/* Button to calculate costs based on inputs */}
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
          {result && result.chartData && (
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

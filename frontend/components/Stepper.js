import React from "react";
import PropTypes from "prop-types";

const Stepper = ({ currentStep, totalSteps, onPrev, onNext }) => {
  const circles = Array.from({ length: totalSteps }, (_, index) => index + 1);
  Stepper.propTypes = {
    currentStep: PropTypes.number.isRequired,
    totalSteps: PropTypes.number.isRequired,
    onPrev: PropTypes.func.isRequired,
    onNext: PropTypes.func.isRequired,
  };

  const stepperStyles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-family: "Poppins", sans-serif;
    }

    .container2 {
      display: flex;
      flex-direction: column;
      align-items: center;
    
      max-width: 400px;
      width: 100%;
    }

    .steps {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }

    .circle {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      width: 50px;
      background-color: #fff;
      border-radius: 50%;
      color: #999;
      font-size: 22px;
      font-weight: 500;
      border: 4px solid #e0e0e0;
      transition: all 0.3s ease;
      transition-delay: 0s;
    }

    .circle.active {
      transition-delay: 0.1s;
      border-color: #4070f4;
      color: #4070f4;
    }

    .progress-bar {
      position: absolute;
      height: 4px;
      width: 100%;
      background-color: #e0e0e0;
      z-index: -1;
    }

    .progress-bar .indicator {
      position: absolute;
      height: 100%;
      width: 0%;
      background-color: #4070f4;
      transition: all 0.3s ease;
    }

    .buttons {
      display: flex;
      gap: 20px;
    }

    .buttons button {
      padding: 8px 16px;
      border: none;
      outline: none;
      color: #fff;
      background-color: #4070f4;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

    .buttons button:active {
      transform: scale(0.97);
    }

    .buttons button:disabled {
      background-color: #87a5f8;
      cursor: not-allowed;
    }
  `;

  return (
    <div
      style={{
        width: "900px",
        margin: "auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(600px, 1fr))",
        gap: "20px",
      }}
    >
      <style>{stepperStyles}</style>
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "400px",
          width: "100%",
          padding: "20px",
        }}
      >
        <div className="steps">
          {circles.map((step) => (
            <div
              key={step}
              className={`circle ${step <= currentStep ? "active" : ""}`}
            >
              {step}
            </div>
          ))}
          <div className="progress-bar">
            <div
              className="indicator"
              style={{
                width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
              }}
            />
          </div>
        </div>
        <div className="buttons"></div>
      </div>
    </div>
  );
};

module.exports = {
  Stepper,
};

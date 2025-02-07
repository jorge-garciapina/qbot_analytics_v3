import React from "react";

export const PeakHoursModal: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          height: "90%",
          overflow: "auto",
        }}
      >
        <h2>Peak Hour Modal</h2>
      </div>
    </div>
  );
};

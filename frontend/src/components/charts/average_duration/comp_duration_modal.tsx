import React from "react";

export const DurationModal: React.FC = () => {
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
        <h2>Call Duration Data Visualization</h2>
      </div>
    </div>
  );
};

// TransferredPercentageModal
import React from "react";

export const TransferredPercentageModal: React.FC = () => {
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
          padding: "20px",
          borderRadius: "8px",
          width: "90%",
          height: "90%",
          overflow: "auto", // Enable scrolling within the modal
          backgroundColor: "white",
        }}
      >
        <h2>Transferred Calls Percentage</h2>

        {/* <ReactECharts
          option={options}
          style={{ height: "80vh", width: "100%" }}
          notMerge={true}
          lazyUpdate={true}
        /> */}
      </div>
    </div>
  );
};

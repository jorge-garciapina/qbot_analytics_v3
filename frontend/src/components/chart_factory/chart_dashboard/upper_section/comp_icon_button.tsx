import React from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

interface IconButtonChartProps {
  icon: React.ReactNode; // Accepts any React node as the icon
  tooltipTitle: string; // Tooltip title
  onClick?: () => void; // Optional click handler
}

export const IconButtonChart: React.FC<IconButtonChartProps> = ({
  icon,
  tooltipTitle,
  onClick,
}) => {
  return (
    <Tooltip title={tooltipTitle}>
      <IconButton color="primary" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

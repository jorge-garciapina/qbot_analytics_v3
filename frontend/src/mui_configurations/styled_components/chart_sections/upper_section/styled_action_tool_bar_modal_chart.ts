import { Container, styled } from "@mui/material";

export const STYLED_ActionToolbarModalChart_Container = styled(Container)(
  ({ theme }) => {
    // console.log(theme.spacing(2));
    // console.log(theme.spacing(1, 2));
    // console.log(theme.shape.borderRadius * 2);
    return {
      display: "flex",
      alignItems: "center", // Corrected camelCase for align-items
      justifyContent: "flex-end", // Corrected camelCase and added quotes for flex-end
      gap: "16px", // Added quotes for numeric value with units
      padding: "8px 16px", // Added quotes for padding
      backgroundColor: theme.palette.secondary.dark, // Corrected camelCase for background-color
      borderBottom: "1px solid #e0e0e0", // Corrected camelCase for border-bottom
    };
  }
);

// export const ActionToolbarContainer = styled(Container)(({ theme }) => (
//   {
//   display: "flex",
//   alignItems: "center", // Corrected camelCase for align-items
//   justifyContent: "flex-end", // Corrected camelCase and added quotes for flex-end
//   gap: "16px", // Added quotes for numeric value with units
//   padding: "8px 16px", // Added quotes for padding
//   backgroundColor: theme.palette.secondary.dark, // Corrected camelCase for background-color
//   borderBottom: "1px solid #e0e0e0", // Corrected camelCase for border-bottom
// }

// ));

import { Container, styled } from "@mui/material";

export const STYLED_TitleStyledContainer_Container = styled(Container)(
  ({ theme }) => ({
    display: "flex", // Use flexbox for layout
    alignItems: "center", // Align items vertically in the center
    justifyContent: "space-between", // Space out the children
    backgroundColor: theme.palette.secondary.light,
    borderColor: theme.palette.secondary.dark,
    borderWidth: "5px",
    border: "solid",
    padding: "8px 16px", // Add padding for spacing
  })
);

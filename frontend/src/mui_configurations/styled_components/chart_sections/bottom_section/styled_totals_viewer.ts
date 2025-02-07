import { Container, styled } from "@mui/material";

export const STYLED_TotalsViewer_Container = styled(Container)(({ theme }) => ({
  backgroundColor: "blue",
  borderColor: theme.palette.secondary.dark,
  borderWidth: "5px",
  border: "solid",
  fontSize: "0.8rem",
}));

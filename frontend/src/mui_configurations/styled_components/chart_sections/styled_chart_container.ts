import { Container, styled } from "@mui/material";
export const STYLED_Chart_Container = styled(Container)(({ theme }) => ({
  backgroundColor: "yellow",
  borderColor: theme.palette.secondary.dark,
  borderWidth: "5px",
  border: "solid",
}));

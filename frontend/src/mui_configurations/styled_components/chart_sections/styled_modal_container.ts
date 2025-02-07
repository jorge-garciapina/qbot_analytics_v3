import { Container, styled } from "@mui/material";

export const STYLED_Modal_Container = styled(Container)(({ theme }) => ({
  backgroundColor: "pink",
  flexDirection: "column",
  borderColor: theme.palette.secondary.dark,
  borderWidth: "5px",
  border: "solid",
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  overflow: "auto",
  zIndex: 1000,
}));

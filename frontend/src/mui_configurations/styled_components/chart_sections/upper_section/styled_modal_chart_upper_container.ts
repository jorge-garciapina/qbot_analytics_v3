import { Container, styled } from "@mui/material";

export const STYLED_ModalChartUpperSection_Container = styled(Container)(
  ({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.secondary.light,
  })
);

import { Container, styled } from "@mui/material";

export const STYLED_ChartMiddleSection_Container = styled(Container)(
  ({ theme }) => ({
    backgroundColor: "cadetblue",
    borderColor: theme.palette.secondary.dark,
    borderWidth: "5px",
    border: "solid",
  })
);

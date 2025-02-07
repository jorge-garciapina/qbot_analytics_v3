import { Container, styled } from "@mui/material";

export const STYLED_BottomSection_Container = styled(Container)(
  ({ theme }) => ({
    backgroundColor: "green",
    borderColor: theme.palette.secondary.dark,
    borderWidth: "5px",
    border: "solid",
  })
);

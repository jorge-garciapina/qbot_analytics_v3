import { Button, styled } from "@mui/material";

export const STYLED_DateRange_Button = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

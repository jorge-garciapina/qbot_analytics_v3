import { IconButton, styled } from "@mui/material";

export const STYLED_CloseModal_Button = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  backgroundColor: theme.palette.primary.dark,
  borderRadius: "50%",
  transition: "background-color 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
}));

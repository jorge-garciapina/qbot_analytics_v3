import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
export const DropDownMenuChart: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as string);
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="dropdown-label">Total</InputLabel>
      <Select
        labelId="dropdown-label"
        value={selectedOption}
        onChange={handleChange}
        label="Select an Option"
      >
        <MenuItem value="option1">Option 1</MenuItem>
        <MenuItem value="option2">Option 2</MenuItem>
        <MenuItem value="option3">Option 3</MenuItem>
      </Select>
    </FormControl>
  );
};

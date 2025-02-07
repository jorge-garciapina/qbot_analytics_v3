import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface DatePickerInput {
  dateModifier: (date: string) => void;
  initialDate: string;
  endDate: string;
  role: "initial_date_selector" | "end_date_selector";
}

export const DayPicker: React.FC<DatePickerInput> = ({
  dateModifier,
  role,
  initialDate,
  endDate,
}) => {
  const { t } = useTranslation();

  const defaultValue = role === "initial_date_selector" ? initialDate : endDate;

  const minDate =
    role === "initial_date_selector"
      ? dayjs("2024-01-01") // Global lower bound (adjust as needed)
      : dayjs(initialDate);

  const maxDate =
    role === "initial_date_selector"
      ? dayjs(endDate) // Restrict initial date selection to before the end date
      : undefined; // No upper limit for endDate selection

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        // label="Select a Day"
        label={t("dateRangeSelector.label")}
        defaultValue={dayjs(defaultValue)}
        onChange={(chosenDate) => {
          if (chosenDate) {
            dateModifier(chosenDate.format()); // Pass the ISO string to the dateModifier
          }
        }}
        views={["year", "month", "day"]}
        minDate={minDate}
        maxDate={maxDate}
      />
    </LocalizationProvider>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////////
// import React from "react";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

// interface DatePickerInput {
//   dateModifier: (date: string) => void;
//   initialDate: string;
//   endDate: string;
//   role: "initial_date_selector" | "end_date_selector";
// }

// export const DayPicker: React.FC<DatePickerInput> = ({
//   dateModifier,
//   role,
//   initialDate,
//   endDate,
// }) => {
//   const defaultValue = role === "initial_date_selector" ? initialDate : endDate;
//   const minValue = role === "initial_date_selector" ? undefined : endDate;
//   const maxValue = role === "initial_date_selector" ? undefined : endDate;

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DatePicker
//         label="Select a Day"
//         defaultValue={dayjs(defaultValue)}
//         value={null}
//         onChange={(chosenDate) => {
//           if (chosenDate) {
//             dateModifier(chosenDate.format()); // Pass the ISO string to the dateModifier
//           }
//         }}
//         views={["year", "month", "day"]} // Allow selecting year, month, and day
//         minDate={dayjs("2024-01-01")} // Use `dayjs` for minDate
//       />
//     </LocalizationProvider>
//   );
// };

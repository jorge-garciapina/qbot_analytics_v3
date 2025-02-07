import { DayPicker } from "./comp_date_picker";

interface RangeSelectorInput {
  initialDateModifier: (date: string) => void;
  endDateModifier: (date: string) => void;
  initialDate: string;
  endDate: string;
}

export const DateRangeSelector: React.FC<RangeSelectorInput> = ({
  initialDateModifier,
  endDateModifier,
  initialDate,
  endDate,
}) => {
  return (
    <>
      <DayPicker
        dateModifier={(date) => {
          initialDateModifier(date);
        }}
        role="initial_date_selector"
        initialDate={initialDate}
        endDate={endDate}
      />
      <DayPicker
        dateModifier={(date) => {
          endDateModifier(date);
        }}
        role="end_date_selector"
        initialDate={initialDate}
        endDate={endDate}
      />
    </>
  );
};

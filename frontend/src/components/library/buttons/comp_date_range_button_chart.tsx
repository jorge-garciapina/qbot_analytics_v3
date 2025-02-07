import { STYLED_DateRange_Button } from "../../../mui_configurations/styled_components/buttons/styled_date_range_button_chart";

interface DateRangeButtonInput {
  buttonText: string;
}

export const DateRangeButtonChart: React.FC<DateRangeButtonInput> = ({
  buttonText,
}) => {
  return <STYLED_DateRange_Button>{buttonText}</STYLED_DateRange_Button>;
};

import { STYLED_ActionToolbarModalChart_Container } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_action_tool_bar_modal_chart";
import { DropDownMenuChart } from "../../../library/comp_drop_down_menu_chart";
import { DateRangeButtonChart } from "../../../library/buttons/comp_date_range_button_chart";

// Example Usage
export const ActionToolbar: React.FC = () => {
  return (
    <STYLED_ActionToolbarModalChart_Container>
      <DropDownMenuChart />
      <DateRangeButtonChart buttonText={"This Week"} />
      <DateRangeButtonChart buttonText={"This Month"} />
      <DateRangeButtonChart buttonText={"This Year"} />
    </STYLED_ActionToolbarModalChart_Container>
  );
};

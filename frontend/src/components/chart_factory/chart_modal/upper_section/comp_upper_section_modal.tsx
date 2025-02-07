import { STYLED_ModalChartUpperSection_Container } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_modal_chart_upper_container";
import { ActionToolbar } from "./comp_action_toolbar_modal";
import { ModalHeader } from "./comp_header";

interface UpperSectionInput {
  title: string;
}

export const UpperSectionModal: React.FC<UpperSectionInput> = () => {
  return (
    <STYLED_ModalChartUpperSection_Container>
      <ModalHeader />
      <ActionToolbar />
    </STYLED_ModalChartUpperSection_Container>
  );
};

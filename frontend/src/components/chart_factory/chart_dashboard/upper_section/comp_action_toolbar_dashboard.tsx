// CUSTOM COMPONENTS IMPORTS
import { STYLED_ActionToolbarDashboardChart_Container } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_action_tool_bar_dashboard_chart";
import { DropDownMenuChart } from "../../../library/comp_drop_down_menu_chart";
import { IconButtonChart } from "./comp_icon_button";

// TRANSLATION IMPORTS
import { useTranslation } from "react-i18next";

// TYPES IMPORTS
import { ActionToolbarInput } from "../../../../types/data_types";

// LIBRARY IMPORTS
import { OpenInNew, Search } from "@mui/icons-material";
export const ActionToolbar: React.FC<ActionToolbarInput> = ({ openModal }) => {
  const { t } = useTranslation();

  function appointmentDetails() {
    console.log("Appointment Details clicked");
  }
  return (
    <STYLED_ActionToolbarDashboardChart_Container>
      <DropDownMenuChart />
      <IconButtonChart
        icon={<OpenInNew />}
        tooltipTitle={t("chartInformation.buttons.trends")}
        onClick={() => openModal()}
      />

      <IconButtonChart
        icon={<Search />}
        tooltipTitle={t("chartInformation.buttons.details")}
        onClick={appointmentDetails}
      />
    </STYLED_ActionToolbarDashboardChart_Container>
  );
};

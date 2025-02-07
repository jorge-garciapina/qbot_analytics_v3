import { STYLED_ChartTitle_Container } from "../../../../mui_configurations/styled_components/typography/styled_chart_title";
import { STYLED_TitleStyledContainer_Container } from "../../../../mui_configurations/styled_components/chart_sections/upper_section/styled_title_container";
import { InfoOutlined } from "@mui/icons-material";
import { IconButtonChart } from "./comp_icon_button";
interface TitleContainerInput {
  title: string;
}

export const TitleContainer: React.FC<TitleContainerInput> = ({ title }) => {
  function chartInfo() {
    console.log("Appointment Information clicked");
  }
  return (
    <STYLED_TitleStyledContainer_Container>
      <STYLED_ChartTitle_Container>{title}</STYLED_ChartTitle_Container>
      <IconButtonChart
        icon={<InfoOutlined />}
        tooltipTitle="Open In new"
        onClick={chartInfo}
      />
    </STYLED_TitleStyledContainer_Container>
  );
};

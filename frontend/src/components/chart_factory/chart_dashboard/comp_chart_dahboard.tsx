import { STYLED_Chart_Container } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_container";
import { UpperSectionDashboardChart } from "./upper_section/comp_upper_section_dashboard";
import { BottomSection } from "./bottom_section/comp_bottom_section";
import { STYLED_ChartMiddleSection_Container } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
import ReactECharts from "echarts-for-react";
import { DashboardChartProps } from "../../../types/data_types";

export const DashboardChart: React.FC<DashboardChartProps> = ({
  options,
  totals,
  openModal,
}) => {
  const { title, ...otherOptions } = options;

  const totalsDummy = totals || [
    {
      name: "",
      value: 0,
    },
  ];

  return (
    <STYLED_Chart_Container>
      <UpperSectionDashboardChart title={title.text} openModal={openModal} />
      <STYLED_ChartMiddleSection_Container>
        <ReactECharts
          option={otherOptions}
          style={{ height: 400, width: "100%" }}
        />
      </STYLED_ChartMiddleSection_Container>
      <BottomSection totals={totalsDummy} />
    </STYLED_Chart_Container>
  );
};

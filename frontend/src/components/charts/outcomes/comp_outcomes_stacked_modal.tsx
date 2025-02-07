import React from "react";

import { useAppointmentTrendsData } from "../../../hooks/hook_use_appointment_trends_data";
import { generateTrendSeriesData } from "../../../utils/data/charts/chart_series_generators/utils_trend_series_data";
import { useTranslation } from "react-i18next";

import { generateTrendsOptions } from "../../../utils/data/charts/chart_options_generators/utils_trend_options";

//************************************************************************************************************* */
import { STYLED_Chart_Container } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_container";
import { UpperSectionModal } from "../../chart_factory/chart_modal/upper_section/comp_upper_section_modal";
import { STYLED_ChartMiddleSection_Container } from "../../../mui_configurations/styled_components/chart_sections/styled_chart_middle_section";
import ReactECharts from "echarts-for-react";
//************************************************************************************************************* */

export const OutcomesModal: React.FC = () => {
  const { t } = useTranslation();
  //**
  // TODO: It might be a good idea to put these date in the context
  // RREASON: They the initialDate is the date from which the system will
  //          be implemented, so it is a value that must be available, regardless
  //          the modifications
  // ---------------------------ASK FOR THIS---------------------------
  //  */
  const initialDate = "2020-02-01T00:00:00.000Z";
  const endDate = "2024-12-31T00:00:00.000Z";

  // Fetch processed appointment trends data
  const { processedData, isAnyPending } = useAppointmentTrendsData({
    initialDate: initialDate,
    endDate: endDate,
  });

  if (isAnyPending) return "Loading...";

  const seriesData = generateTrendSeriesData(processedData);

  const chartOptions = generateTrendsOptions({
    title: t("chartInformation.trendsChart.chartTitle"),
    xAxisName: t("chartInformation.trendsChart.xAxisName"),
    yAxisData: seriesData,
    yAxisName: t("chartInformation.trendsChart.yAxisName"),
  });

  const { title, ...otherOptions } = chartOptions;

  return (
    <STYLED_Chart_Container>
      <UpperSectionModal title={title.text} />
      <STYLED_ChartMiddleSection_Container>
        <ReactECharts
          option={otherOptions}
          style={{ height: 400, width: "100%" }}
        />
      </STYLED_ChartMiddleSection_Container>
    </STYLED_Chart_Container>
  );
};

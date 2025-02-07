import {
  generateChartTitle,
  generateToolTip,
  generateLegend,
  generateXAxis,
  generateYAxis,
} from "../../../utils_charts_options_object";

import { ChartOptions, SeriesItem } from "../../../../types/data_types";

interface TrendsOptionsInput {
  title: string;
  xAxisName: string;
  yAxisData: SeriesItem[];
  yAxisName: string;
}

export function generateTrendsOptions({
  title,
  xAxisName,
  yAxisData,
  yAxisName,
}: TrendsOptionsInput): ChartOptions {
  /**
   * This function generate the options needed to build the Echart
   */
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const chartOptions: ChartOptions = {
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({
      data: months,
      name: xAxisName,
    }),
    yAxis: generateYAxis(yAxisName),
    series: yAxisData,
  };

  return chartOptions;
}

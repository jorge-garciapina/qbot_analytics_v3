import {
  CallRecordsMigration,
  SeriesItem,
  ChartOptions,
} from "../../../../types/data_types";

import {
  generateYAxis,
  generateChartTitle,
  generateToolTip,
  generateLegend,
  generateXAxis,
} from "../../../utils_charts_options_object";

interface CallDurationInput {
  fetchedData: CallRecordsMigration;
  seriesData: SeriesItem[];
  title: string;
  xAxisName: string;
  yAxisName: string;
}

export function generateCallDurationOptions({
  fetchedData,
  seriesData,
  title,
  xAxisName,
  yAxisName,
}: CallDurationInput) {
  const dayKeys = fetchedData.handlingOverviewDaily.chartKeys;

  const chartOptions: ChartOptions = {
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({
      data: dayKeys,
      name: xAxisName,
    }),
    yAxis: generateYAxis(yAxisName),
    series: seriesData,
  };

  return chartOptions;
}

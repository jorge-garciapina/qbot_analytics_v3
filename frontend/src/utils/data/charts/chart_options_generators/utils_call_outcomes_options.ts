import {
  ChartOptions,
  SeriesItem,
  CallRecordsMigration,
} from "../../../../types/data_types";
import {
  generateYAxis,
  generateChartTitle,
  generateToolTip,
  generateLegend,
  generateXAxis,
} from "../../../utils_charts_options_object";

interface CallsOutcomesInput {
  fetchedData: CallRecordsMigration;
  title: string;
  xAxisName: string;
  seriesData: SeriesItem[];
  yAxisName: string;
}
export function generateCallOutcomesOptions({
  fetchedData,
  title,
  xAxisName,
  seriesData,
  yAxisName,
}: CallsOutcomesInput): ChartOptions {
  const chartKeys: string[] = fetchedData.handlingOverviewDaily.chartKeys;
  const chartOptions: ChartOptions = {
    title: generateChartTitle(title),
    tooltip: generateToolTip(),
    legend: generateLegend(),
    xAxis: generateXAxis({
      data: chartKeys,
      name: xAxisName,
    }),
    yAxis: generateYAxis(yAxisName),

    series: seriesData,
  };
  return chartOptions;
}

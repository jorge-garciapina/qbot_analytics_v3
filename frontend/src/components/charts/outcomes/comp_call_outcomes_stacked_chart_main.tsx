import React, { useEffect } from "react";

import { OutcomesModal } from "./comp_outcomes_stacked_modal";
import { useLoginData } from "../../../hooks/hook_usecall_records";

import {
  ComponentInputMigration,
  ChartOptions,
  ChartTotals,
  SeriesItem,
} from "../../../types/data_types";

import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";

import { useTranslation } from "react-i18next";

import { generateCallOutcomesSeriesData } from "../../../utils/data/charts/chart_series_generators/utils_call_outcomes_series_data";
import { generateCallOutcomesOptions } from "../../../utils/data/charts/chart_options_generators/utils_call_outcomes_options";
import { generateCallOutcomesTotals } from "../../../utils/data/charts/chart_totals_generators/utils_call_outcomes_totals";
// Main Component
const CallOutcomesStackedChart: React.FC<ComponentInputMigration> = ({
  initialDate,
  endDate,
  refreshTrigger,
  renderModal,
}) => {
  const { t } = useTranslation();

  const { isPending, error, fetchedData, refetch } = useLoginData({
    queryKey: "login",
    initialDate,
    endDate,
  });

  useEffect(() => {
    refetch();
  }, [refreshTrigger]);

  // Handle loading and errors
  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  // ------------------------GENERATE CHART CONFIGURATION-----------------------
  if (fetchedData) {
    // GENERATE SERIES DATA:
    const seriesData: SeriesItem[] = generateCallOutcomesSeriesData({
      fetchedData: fetchedData,
      callsHandledByAIName: t("chartInformation.callOutcomesChart.handledByAI"),
      callsHandledByHumanName: t(
        "chartInformation.callOutcomesChart.handledByHuman"
      ),
    });

    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateCallOutcomesOptions({
      fetchedData: fetchedData,
      title: t("chartInformation.callOutcomesChart.chartTitle"),
      xAxisName: t("chartInformation.callOutcomesChart.xAxisName"),
      seriesData: seriesData,
      yAxisName: t("chartInformation.callOutcomesChart.yAxisName"),
    });

    // GENERATE TOTALS
    const callOutcomesTotals: ChartTotals = generateCallOutcomesTotals({
      fetchedData: fetchedData,
      totalName: t("chartInformation.callOutcomesChart.totals.total"),
      handledByAIName: t(
        "chartInformation.callOutcomesChart.totals.handledByAI"
      ),
      handledByHumanName: t(
        "chartInformation.callOutcomesChart.totals.handledByHuman"
      ),
    });

    return (
      <>
        <DashboardChart
          options={chartOptions}
          totals={callOutcomesTotals}
          openModal={() => {
            renderModal(<OutcomesModal />);
          }}
        />
      </>
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(CallOutcomesStackedChart, (prevProps, nextProps) => {
  return (
    prevProps.endDate === nextProps.endDate &&
    prevProps.initialDate === nextProps.initialDate
  );
});

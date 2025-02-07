import React, { useEffect } from "react";

import { DurationModal } from "./comp_duration_modal";

import { useLoginData } from "../../../hooks/hook_usecall_records";
import { ComponentInputMigration, SeriesItem } from "../../../types/data_types";

import { ChartOptions } from "../../../types/data_types";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { useTranslation } from "react-i18next";

import { generateCallDurationSeriesData } from "../../../utils/data/charts/chart_series_generators/utils_call_duration_series";
import { generateCallDurationOptions } from "../../../utils/data/charts/chart_options_generators/utils_call_duration_options";
import { generateCallDurationTotals } from "../../../utils/data/charts/chart_totals_generators/utils_call_duration_totals";

const AverageTimeToEscalateChart: React.FC<ComponentInputMigration> = ({
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

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  // ------------------------------------------------------

  if (fetchedData) {
    // GENERATE SERIES DATA:
    const seriesData: SeriesItem[] = generateCallDurationSeriesData({
      fetchedData: fetchedData,
      callsHandledByAIName: t("chartInformation.callDuration.handledByAI"),
      callsHandledByHumanName: t(
        "chartInformation.callDuration.handledByHuman"
      ),
    });
    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateCallDurationOptions({
      fetchedData: fetchedData,
      title: t("chartInformation.callDuration.chartTitle"),
      seriesData: seriesData,
      xAxisName: t("chartInformation.callDuration.xAxisName"),
      yAxisName: t("chartInformation.callDuration.yAxisName"),
    });
    // GENERATE TOTALS:
    const callOutcomesTotals = generateCallDurationTotals({
      fetchedData: fetchedData,
      totalName: t("chartInformation.callDuration.totals.total"),
      handledByAIName: t("chartInformation.callDuration.totals.handledByAI"),
      handledByHumanName: t(
        "chartInformation.callDuration.totals.handledByHuman"
      ),
    });

    return (
      <>
        <DashboardChart
          options={chartOptions}
          totals={callOutcomesTotals}
          openModal={() => {
            renderModal(<DurationModal />);
          }}
        />
      </>
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(
  AverageTimeToEscalateChart,
  (prevProps, nextProps) => {
    return (
      prevProps.endDate === nextProps.endDate &&
      prevProps.initialDate === nextProps.initialDate
    );
  }
);

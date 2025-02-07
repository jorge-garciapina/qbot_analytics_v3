/*
This component does not have any logic to handle the click event over a bar ot the title, 
the reason for this is that the information that can be displayed has already been addressed 
in other components. 
*/

import React, { useEffect } from "react";

import { useLoginData } from "../../../hooks/hook_usecall_records";
import {
  ChartTotals,
  ComponentInputMigration,
  SeriesItem,
} from "../../../types/data_types";

import { ChartOptions } from "../../../types/data_types";

import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { useTranslation } from "react-i18next";

import { PeakHoursModal } from "./comp_peak_hours_modal";

import { generateCallCountByHourSeriesData } from "../../../utils/data/charts/chart_series_generators/utils_call_count_by_hour_series";
import { generateCallCountByHourOptions } from "../../../utils/data/charts/chart_options_generators/utils_call_count_by_hour_options";
import { generateCallCountByHourTotals } from "../../../utils/data/charts/chart_totals_generators/utils_call_count_by_hour_totals";

export const CallCountByHourChart: React.FC<ComponentInputMigration> = ({
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

  // Prepare chart data

  if (fetchedData) {
    // GENERATE SERIES DATA:
    const seriesData: SeriesItem[] = generateCallCountByHourSeriesData({
      fetchedData: fetchedData,
      callsHandledByAIName: t("chartInformation.peakHours.handledByAI"),
      callsHandledByHumanName: t("chartInformation.peakHours.handledByHuman"),
    });

    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateCallCountByHourOptions({
      fetchedData: fetchedData,
      title: t("chartInformation.peakHours.chartTitle"),
      seriesData: seriesData,
      xAxisName: t("chartInformation.peakHours.xAxisName"),
      yAxisName: t("chartInformation.peakHours.yAxisName"),
    });

    // GENERATE TOTALS
    const callCountByHourTotals: ChartTotals = generateCallCountByHourTotals({
      fetchedData: fetchedData,
      peakHourName: t("chartInformation.peakHours.totals.peakHour"),
      peakVolumeName: t("chartInformation.peakHours.totals.peakVolume"),
    });

    return (
      <>
        <DashboardChart
          options={chartOptions}
          totals={callCountByHourTotals}
          openModal={() => {
            renderModal(<PeakHoursModal />);
          }}
        />
      </>
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(CallCountByHourChart, (prevProps, nextProps) => {
  return (
    prevProps.endDate === nextProps.endDate &&
    prevProps.initialDate === nextProps.initialDate
  );
});

import React, { useEffect } from "react";

import { TransferredPercentageModal } from "./comp_transferred_percentage_modal";

import {
  ChartTotals,
  ComponentInputMigration,
  SeriesItem,
} from "../../../types/data_types";

import { useLoginData } from "../../../hooks/hook_usecall_records";

import { ChartOptions } from "../../../types/data_types";
import { DashboardChart } from "../../chart_factory/chart_dashboard/comp_chart_dahboard";
import { useTranslation } from "react-i18next";

import { generateTransferredPercentageSeriesData } from "../../../utils/data/charts/chart_series_generators/utils_transferred_percentage_series_data";
import { generateTransferredCallsOptions } from "../../../utils/data/charts/chart_options_generators/utils_transferred_percentage_options";
import { generateTransferredPercentageTotals } from "../../../utils/data/charts/chart_totals_generators/utils_transferred_percentage_totals";

const EscalationRateChart: React.FC<ComponentInputMigration> = ({
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
    const seriesData: SeriesItem[] = generateTransferredPercentageSeriesData({
      fetchedData: fetchedData,
      seriesName: t("chartInformation.transferredPercentage.seriesName"),
    });

    // GENERATE OPTIONS:
    const chartOptions: ChartOptions = generateTransferredCallsOptions({
      fetchedData: fetchedData,
      title: t("chartInformation.transferredPercentage.chartTitle"),
      seriesData: seriesData,
      xAxisName: t("chartInformation.transferredPercentage.xAxisName"),
      yAxisName: t("chartInformation.transferredPercentage.yAxisName"),
    });

    // GENERATE TOTALS
    const callOutcomesTotals: ChartTotals = generateTransferredPercentageTotals(
      {
        fetchedData: fetchedData,
        totalName: t("chartInformation.transferredPercentage.totals.total"),
        handledByAIName: t(
          "chartInformation.transferredPercentage.totals.handledByAI"
        ),
        handledByHumanName: t(
          "chartInformation.transferredPercentage.totals.handledByHuman"
        ),
      }
    );

    return (
      <>
        <DashboardChart
          options={chartOptions}
          totals={callOutcomesTotals}
          openModal={() => {
            renderModal(<TransferredPercentageModal />);
          }}
        />
      </>
    );
  }
};

// Memoize the component to prevent re-rendering on `initialDate` changes
export default React.memo(EscalationRateChart, (prevProps, nextProps) => {
  return (
    prevProps.endDate === nextProps.endDate &&
    prevProps.initialDate === nextProps.initialDate
  );
});

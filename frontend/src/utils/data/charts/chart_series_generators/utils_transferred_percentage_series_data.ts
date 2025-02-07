import { SeriesItem, CallRecordsMigration } from "../../../../types/data_types";

export function generateTransferredPercentageSeriesData({
  fetchedData,
  seriesName,
}: {
  fetchedData: CallRecordsMigration;
  seriesName: string;
}): SeriesItem[] {
  const seriesData =
    fetchedData?.handlingOverviewDaily.callsHandledByAIPercentage || [];
  return [
    {
      name: seriesName,
      type: "line",
      data: seriesData,
    },
  ];
}

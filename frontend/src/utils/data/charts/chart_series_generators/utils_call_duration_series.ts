import { SeriesItem, CallRecordsMigration } from "../../../../types/data_types";

interface CallDurationData {
  fetchedData: CallRecordsMigration;
  callsHandledByAIName: string;
  callsHandledByHumanName: string;
}

export function generateCallDurationSeriesData({
  fetchedData,
  callsHandledByAIName,
  callsHandledByHumanName,
}: CallDurationData): SeriesItem[] {
  const callsHandledByAIAverageDuration =
    fetchedData.averageDurationDaily.callsHandledByAIAverageDuration;
  const callsHandledByHumanAverageDuration =
    fetchedData.averageDurationDaily.callsHandledByHumanAverageDuration;
  return [
    {
      name: callsHandledByAIName,
      type: "line",
      data: callsHandledByAIAverageDuration,
    },
    {
      name: callsHandledByHumanName,
      type: "line",
      data: callsHandledByHumanAverageDuration,
    },
  ];
}

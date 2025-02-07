import { SeriesItem, CallRecordsMigration } from "../../../../types/data_types";

interface CallDurationData {
  fetchedData: CallRecordsMigration;
  callsHandledByAIName: string;
  callsHandledByHumanName: string;
}

export function generateCallCountByHourSeriesData({
  fetchedData,
  callsHandledByAIName,
  callsHandledByHumanName,
}: CallDurationData): SeriesItem[] {
  const callsHandledByAI = fetchedData.peakTimes.callsHandledByAI;
  const callsHandledByHuman = fetchedData.peakTimes.callsHandledByHuman;
  return [
    {
      name: callsHandledByAIName,
      type: "bar",
      stack: "calls",
      data: callsHandledByAI,
    },
    {
      name: callsHandledByHumanName,
      type: "bar",
      stack: "calls",
      data: callsHandledByHuman,
    },
  ];
}

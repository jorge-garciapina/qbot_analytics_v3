import { SeriesItem, CallRecordsMigration } from "../../../../types/data_types";

interface OutcomesData {
  fetchedData: CallRecordsMigration;
  callsHandledByAIName: string;
  callsHandledByHumanName: string;
}

export function generateCallOutcomesSeriesData({
  fetchedData,
  callsHandledByAIName,
  callsHandledByHumanName,
}: OutcomesData): SeriesItem[] {
  const callsHandledByAI: number[] =
    fetchedData.handlingOverviewDaily.callsHandledByAI;
  const callsHandledByHuman: number[] =
    fetchedData.handlingOverviewDaily.callsHandledByHuman;
  return [
    {
      data: callsHandledByAI,
      name: callsHandledByAIName,
      type: "bar",
      stack: "calls",
    },
    {
      data: callsHandledByAI,
      name: callsHandledByAIName,
      type: "line",
      stack: "",
    },
    {
      data: callsHandledByHuman,
      name: callsHandledByHumanName,
      type: "bar",
      stack: "calls",
    },
  ];
}

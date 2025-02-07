import {
  CallRecordsMigration,
  ChartTotals,
} from "../../../../types/data_types";

interface CallOutcomesInput {
  fetchedData: CallRecordsMigration | undefined;
  totalName: string;
  handledByAIName: string;
  handledByHumanName: string;
}
export function generateTransferredPercentageTotals({
  fetchedData,
  totalName,
  handledByAIName,
  handledByHumanName,
}: CallOutcomesInput): ChartTotals {
  const totalCalls = fetchedData?.handlingOverviewTotal.total || 0;

  const callsHandledByAIPercentage =
    fetchedData?.handlingOverviewTotal.handledByAIPercentage || 0;

  const callsHandledByHumanPercentage =
    fetchedData?.handlingOverviewTotal.handledByHumanPercentage || 0;

  const callOutcomesTotals: ChartTotals = [
    {
      name: totalName,
      value: totalCalls,
    },
    {
      name: handledByAIName,
      value: callsHandledByAIPercentage,
    },
    {
      name: handledByHumanName,
      value: callsHandledByHumanPercentage,
    },
  ];
  return callOutcomesTotals;
}

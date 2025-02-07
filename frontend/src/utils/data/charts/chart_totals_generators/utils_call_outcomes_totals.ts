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
export function generateCallOutcomesTotals({
  fetchedData,
  totalName,
  handledByAIName,
  handledByHumanName,
}: CallOutcomesInput): ChartTotals {
  const totals = fetchedData?.handlingOverviewTotal;

  const callOutcomesTotals: ChartTotals = [
    {
      name: totalName,
      value: totals?.total || 0,
    },
    {
      name: handledByAIName,
      value: totals?.handledByAI || 0,
    },
    {
      name: handledByHumanName,
      value: totals?.handledByHuman || 0,
    },
  ];
  return callOutcomesTotals;
}

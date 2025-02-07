import {
  CallRecordsMigration,
  ChartTotals,
} from "../../../../types/data_types";

interface CallOutcomesInput {
  fetchedData: CallRecordsMigration | undefined;
  peakHourName: string;
  peakVolumeName: string;
}
export function generateCallCountByHourTotals({
  fetchedData,
  peakHourName,
  peakVolumeName,
}: CallOutcomesInput): ChartTotals {
  const peakHour = fetchedData?.peakTimes.peakHour || 0;
  const peakVolume = fetchedData?.peakTimes.peakVolume || 0;

  const callOutcomesTotals: ChartTotals = [
    {
      name: peakHourName,
      value: peakHour,
    },
    {
      name: peakVolumeName,
      value: peakVolume,
    },
  ];
  return callOutcomesTotals;
}

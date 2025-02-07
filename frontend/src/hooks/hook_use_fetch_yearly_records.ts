import { useYearCallRecords } from "./hook_usecall_records";
import { TrendsData } from "../types/data_types";
/**
 * A helper function that fetches call records for a given year.
 *
 * @param year - The year for which data should be fetched.
 * @returns An object with properties `isPending` and `fetchedData`.
 */

export function UseTrendsData(year: number): TrendsData {
  const { isPending, fetchedData } = useYearCallRecords({
    queryKey: "get_yearly_data",
    year: year,
  });

  return {
    isPending,
    months: fetchedData?.months || [],
    scheduledCallsByMonth: fetchedData?.scheduledCallsByMonth || [],
    transferredCallsByMonth: fetchedData?.transferredCallsByMonth || [],
    year: fetchedData?.year || 0,
  };
}

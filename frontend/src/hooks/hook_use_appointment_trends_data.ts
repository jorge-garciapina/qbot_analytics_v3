import { useYear } from "./date_hooks/hook_use_year";
import { useTranslation } from "react-i18next";
import { validateChronologicalOrder } from "../utils/validations/utils_date_validations";
import { UseTrendsData } from "./hook_use_fetch_yearly_records";
import { TrendsYearData, DateRange } from "../types/data_types";
import { preventInvalidExit } from "../utils/error_handlers/utils_exit_error";

/**
 * Custom hook that returns processed appointment trends data for a given date range.
 *
 * @param param0 - An object with `initialDate` and `endDate` strings.
 * @returns An object containing the processed data, a loading flag, and chart-related series.
 */
export function useAppointmentTrendsData({ initialDate, endDate }: DateRange) {
  const initialYear = useYear(initialDate);
  const endYear = useYear(endDate);

  const { t } = useTranslation();

  // Validate input dates
  validateChronologicalOrder({
    initialYear: initialYear.year,
    endYear: endYear.year,
    errorMessage: t("errors.dateErrors.dateFormatIncompatibility"),
  });

  if (areYearsEqual({ initialYear: initialYear.year, endYear: endYear.year })) {
    return dataForSingleYear(initialYear.year);
  } else if (
    areYearsInCorrectOrder({
      initialYear: initialYear.year,
      endYear: endYear.year,
    })
  ) {
    return dataForMultipleYears({
      initialYear: initialYear.year,
      endYear: endYear.year,
    });
  }

  preventInvalidExit(t("errors.exitErrors.invalidDateFormat"));

  return { processedData: [], isAnyPending: true };
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////// UTILITIES ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////
interface YearsInput {
  initialYear: number;
  endYear: number;
}
// //----------------------------------------------------------------------------
function areYearsEqual({ initialYear, endYear }: YearsInput) {
  return initialYear === endYear;
}
// //----------------------------------------------------------------------------
function areYearsInCorrectOrder({ initialYear, endYear }: YearsInput) {
  return initialYear < endYear;
}
// //----------------------------------------------------------------------------
function generateYearsArray({ initialYear, endYear }: YearsInput): number[] {
  const years: number[] = [];
  for (let i = initialYear; i <= endYear; i++) {
    years.push(i);
  }
  return years;
}
// //----------------------------------------------------------------------------
function dataForMultipleYears({ initialYear, endYear }: YearsInput) {
  const yearArray = generateYearsArray({
    initialYear: initialYear,
    endYear: endYear,
  });

  // Process yearly data while ensuring type consistency
  const processedData: TrendsYearData[] = yearArray.map((year) => {
    return UseTrendsData(year);
  });

  const isAnyPending = processedData.some((entry) => entry.isPending);

  return { processedData, isAnyPending };
}
// //----------------------------------------------------------------------------

function dataForSingleYear(currentYear: number) {
  const yearData = UseTrendsData(currentYear);

  return {
    processedData: [yearData],
    isAnyPending: yearData.isPending,
  };
}

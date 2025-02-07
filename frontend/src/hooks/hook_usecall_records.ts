import { useQuery } from "@tanstack/react-query";

import {
  fetchYearlyData,
  fetchLoginData,
} from "../utils/data/utils_custom_queries";

type ValidQueries = "login" | "get_yearly_data";

//------------------------------------------------------------

type UseCallRecordsInputMigration = {
  queryKey: ValidQueries;
  initialDate: string;
  endDate: string;
};

export function useLoginData({
  queryKey,
  initialDate,
  endDate,
}: UseCallRecordsInputMigration) {
  const {
    isPending,
    error,
    data: fetchedData,
    refetch,
  } = useQuery({
    queryKey: [queryKey, initialDate, endDate],
    queryFn: fetchLoginData,
    staleTime: Infinity,
    refetchOnMount: false, // Do not refetch when component mounts
    refetchOnWindowFocus: false, // Do not refetch on window focus
    // initialData: [],
  });

  return {
    isPending,
    error,
    fetchedData,
    refetch,
  };
}
//------------------------------------------------------------

type UseYearCallRecordsInput = {
  queryKey: ValidQueries;
  year: number;
};
export function useYearCallRecords({
  queryKey,
  year,
}: UseYearCallRecordsInput) {
  const inputYear = year || 0;

  const {
    isPending,
    error,
    data: fetchedData,
    refetch,
  } = useQuery({
    queryKey: [queryKey, inputYear],
    queryFn: fetchYearlyData,
    staleTime: Infinity,
    refetchOnMount: false, // Do not refetch when component mounts
    refetchOnWindowFocus: false, // Do not refetch on window focus
    // initialData: [],
  });

  return {
    isPending,
    error,
    fetchedData,
    refetch,
  };
}

export function validateChronologicalOrder({
  initialYear,
  endYear,
  errorMessage,
}: {
  initialYear: number;
  endYear: number;
  errorMessage: string;
}): void {
  if (initialYear > endYear) {
    throw new Error(errorMessage);
  }
}

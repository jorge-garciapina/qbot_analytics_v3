export function generateInitialDateInterval(): {
  initialDate: string;
  endDate: string;
} {
  const todayDate = new Date();
  const currentYear = todayDate.getFullYear();
  const currentMonth = todayDate.getMonth();
  const dayInMonth = todayDate.getDate();

  const endDate = new Date(
    Date.UTC(currentYear, currentMonth, dayInMonth, 0, 0, 0)
  ).toISOString();

  const initialDate = new Date(
    Date.UTC(currentYear, currentMonth, dayInMonth - 20, 0, 0, 0)
  ).toISOString();

  return {
    initialDate: initialDate,
    endDate: endDate,
  };
}

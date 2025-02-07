import { useState } from "react";
import dayjs from "dayjs";

export function useYear(dateToProcess: string):{
    year: number;
    updateYear: (newDate: string) => void
    increaseYearByOne: () => void
} {
    const [year, setYear] = useState<number>(extractYearFromDate(dateToProcess));

    function extractYearFromDate(date: string){
        return dayjs(dateToProcess).year()
    };

    function updateYear(newDate: string){
        setYear(extractYearFromDate(newDate))
    };

    function increaseYearByOne(){
        setYear(year + 1)
    }

   return {
    year:year,
    updateYear, 
    increaseYearByOne
    };

}
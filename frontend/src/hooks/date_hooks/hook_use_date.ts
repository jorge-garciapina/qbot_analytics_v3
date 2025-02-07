import { useState } from "react";

export function useDate(defaultDate: string){
    const [date, setDate] = useState<string>(defaultDate);
    function updateDate(newDate: string){
        setDate(newDate)
    };

    return {
        date:date,
        updateDate
    };

}
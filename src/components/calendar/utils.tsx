import {
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    format,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
} from "date-fns";

export function getMonthGrid(date: Date) {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 0 });
    const rows: Date[][] = [];
    let current = start;
    while (current <= end) {
        const week: Date[] = [];
        for (let i = 0; i < 7; i++) {
            week.push(current);
            current = addDays(current, 1);
        }
        rows.push(week);
    }
    return rows;
}

export const formatISODate = (d: Date) => format(d, "yyyy-MM-dd");

export const formatMonthTitle = (d: Date) => format(d, "MMMM yyyy");
export const formatMonth = (d: Date) => format(d, "MMMM ");

export { addMonths, subMonths, isSameMonth, isSameDay };

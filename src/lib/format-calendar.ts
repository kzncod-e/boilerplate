function formatCalendarDate(dateStr: Date | string) {
    const d = new Date(dateStr);

    return {
        dayName: d.toLocaleDateString("en-US", { weekday: "long" }),
        month: d.toLocaleDateString("en-US", { month: "long" }),
        year: d.getFullYear(),
        dayNumber: d.getDate(),
    };
}
export default formatCalendarDate;

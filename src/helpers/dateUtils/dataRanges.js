export const getDateRangeWithTimezone = (start, end) =>{
    const startDay = moment
    .tz(start, "YYYY-MM-DD", "America/Bogota")
    .startOf("day");
  const endDay = moment
    .tz(end, "YYYY-MM-DD", "America/Bogota")
    .endOf("day");


    return {startDay, endDay}
}

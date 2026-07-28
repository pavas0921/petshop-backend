import moment from "moment-timezone";

export const formatDateWithTimeZone = (startDate, endDate) => {
  const startDay = moment
    .tz(startDate, "YYYY-MM-DD", "America/Bogota")
    .startOf("day");
  const endDay = moment
    .tz(endDate, "YYYY-MM-DD", "America/Bogota")
    .endOf("day");

  return {
    startDay: startDay.toDate(),
    endDay: endDay.toDate(),
  };
};

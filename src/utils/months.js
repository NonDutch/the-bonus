const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const initialState = months.reduce(
  (acc, item) => ({
    ...acc,
    [item]: 0
  }),
  {}
);
export default months;

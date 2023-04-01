export const convertToUnixTimestamp = (date: string | Date) =>
  parseInt((new Date(date).getTime() / 1000).toFixed(0));

import { convertToUnixTimestamp } from './datetime.helper';

export const getTimeStatus = (start: Date, end: Date) => {
  const currentDate = convertToUnixTimestamp(new Date());
  return convertToUnixTimestamp(start) > currentDate
    ? 'upcoming'
    : currentDate > convertToUnixTimestamp(end)
    ? 'past'
    : 'ongoing';
};

export const checkIsTrending = (participant: number) => participant > 10;

export const checkIsNew = (startDate: Date) => {
  const startD = convertToUnixTimestamp(startDate);
  const currentD = convertToUnixTimestamp(new Date());

  if (currentD - startD <= 1209600) {
    return true;
  }
  return false;
};

import dayjs from 'dayjs';
import 'dayjs/locale/es.js';

export const getWeekId = (week) => {
  const monday = dayjs()
    .startOf('week')
    .add(week * 7 + 1, 'day'); // EN locale starts with Sunday
  return monday.format('YYYY-MM-DD');
};

export const incrementWeek = (isoDate: string) => {
  const monday = dayjs(isoDate).startOf('week').add(1, 'day').add(1, 'week');
  return monday.format('YYYY-MM-DD');
};

export const decrementWeek = (isoDate: string) => {
  const monday = dayjs(isoDate)
    .startOf('week')
    .add(1, 'day')
    .subtract(1, 'week');
  return monday.format('YYYY-MM-DD');
};

import dayjs from 'dayjs';
import 'dayjs/locale/es.js';

export const getWeekId = (week) => {
  const monday = dayjs()
    .startOf('week')
    .add(week * 7 + 1, 'day'); // EN locale starts with Sunday
  return monday.format('YYYY-MM-DD');
};

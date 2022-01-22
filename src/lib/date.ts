import dayjs from 'dayjs';
import 'dayjs/locale/es.js';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(weekOfYear);

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

export const getWeekRelative = (isoDate: string) => {
  const diff =
    dayjs(isoDate).subtract(1, 'day').startOf('week').week() -
    dayjs().subtract(1, 'day').startOf('week').week();
  if (diff === 0) {
    return 'esta semana';
  } else if (diff === 1) {
    return 'la semana que viene';
  } else if (diff > 1) {
    return `en ${diff} semanas`;
  } else if (diff === -1) {
    return 'la semana pasada';
  } else {
    return `hace ${diff} semanas`;
  }
};

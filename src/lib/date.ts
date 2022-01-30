import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
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
    return 'Esta semana';
  } else if (diff === 1) {
    return 'La semana que viene';
  } else if (diff > 1) {
    return `En ${diff} semanas`;
  } else if (diff === -1) {
    return 'La semana pasada';
  } else {
    return `Hace ${diff} semanas`;
  }
};

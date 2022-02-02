import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear.js';
dayjs.extend(weekOfYear);

export const getWeekId = (week = 0) => {
  const monday = dayjs()
    .startOf('week')
    .add(week * 7, 'day');
  return monday.format('YYYY-MM-DD');
};

export const incrementWeek = (isoDate: string) => {
  const monday = dayjs(isoDate).startOf('week').add(1, 'week');
  return monday.format('YYYY-MM-DD');
};

export const decrementWeek = (isoDate: string) => {
  const monday = dayjs(isoDate).startOf('week').subtract(1, 'week');
  return monday.format('YYYY-MM-DD');
};

export const getWeekRelative = (isoDate: string) => {
  const diff =
    dayjs(isoDate).startOf('week').week() - dayjs().startOf('week').week();
  if (diff === 0) {
    return 'Esta semana';
  } else if (diff === 1) {
    return 'La semana que viene';
  } else if (diff > 1) {
    return `En ${diff} semanas`;
  } else if (diff === -1) {
    return 'La semana pasada';
  } else {
    return `Hace ${Math.abs(diff)} semanas`;
  }
};

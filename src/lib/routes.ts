export const ROUTES = {
  mealsList: 'meals',
  editMeal: 'meals/:id'
};

/**
 * Returns URL with substituted params specified in `params`.
 */
export const getRoute = (
  pattern: string,
  params: { [param: string]: string | number | boolean } = {}
) => {
  const route = Object.keys(params).reduce((url, key) => {
    const replaceWith = params[key] || '';
    return url.replace(`:${key}`, replaceWith.toString());
  }, pattern);
  return route.replace('?', '');
};

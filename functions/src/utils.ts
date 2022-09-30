export const getErrorMessage = (e: unknown) => {
  let message = 'Unknown error';
  if (e instanceof Error) {
    message = e.message;
  }
  return message;
};

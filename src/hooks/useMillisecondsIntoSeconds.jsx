export const useMillisecondsIntoSeconds = (milliseconds) => {
  const convertedTime = (milliseconds / 1000).toFixed(2);
  return convertedTime;
};

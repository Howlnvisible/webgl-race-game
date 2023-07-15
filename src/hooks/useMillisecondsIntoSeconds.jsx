export const useMillisecondsIntoSeconds = (milliseconds) => {
    console.log(milliseconds);
    const convertedTime = (milliseconds / 1000).toFixed(2)
    return convertedTime
}
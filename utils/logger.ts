/* eslint-disable no-console */
/**
 * @name logger
 * @description A simple logger with prefix, use it totally as console.log()
 */
export const logger = (message?: any, ...optionalParams: any[]): void => {
  if (optionalParams.length > 0) console.log("LOG - ", message, optionalParams);
  else console.log("LOG - ", message);
};

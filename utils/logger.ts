/* eslint-disable no-console */
/**
 * @name Log
 * @description Type of the link, pure message or a message object
 */
type Log =
  | {
      type?: "error" | "log" | "warn";
      message: any;
    }
  | any;

/**
 * @name logger
 * @description A simple logger with prefix, use it totally as console.log()
 */
export const logger = (args: Log): void => {
  if (typeof args === "string") {
    console.log("* LOG - ", args);
  } else {
    const { type, message } = args;
    switch (type) {
      case "warn":
        console.warn("* Warning - ", message);
        break;
      case "error":
        console.error("* Error - ", message);
        break;
      case "log":
      default:
        console.log(message);
    }
  }
};

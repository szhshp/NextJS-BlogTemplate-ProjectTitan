import { Box, Typography, CircularProgress } from "@material-ui/core";
import { useTranslator } from "hooks/useTranslator";
import React from "react";

const LoadingMessage = ({
  text,
  variant = "loading",
}: {
  text: string;
  variant?: "loading" | "plain" | "failed";
}): JSX.Element => {
  const { translate, locale } = useTranslator();
  let message: JSX.Element | string;
  switch (variant) {
    case "loading":
      message = (
        <>
          <CircularProgress size={10} />
          {" "}
          {translate(locale.loading)}
          {" "}
          {text}
        </>
      );
      break;
    case "plain":
      message = text;
      break;
    case "failed":
      message = (
        <>
          {translate(locale.failedToLoad)}
          {" "}
          {text}
        </>
      );
      break;
    default:
      message = "";
  }

  return (
    <Box p={3} display="flex" justifyContent="center" width="100%">
      <Typography variant="caption">{message}</Typography>
    </Box>
  );
};

export default LoadingMessage;

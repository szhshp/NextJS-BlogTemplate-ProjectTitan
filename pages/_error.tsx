type ErrorType = {
  statusCode: number;
};

const Error = ({ statusCode }: ErrorType): JSX.Element => (
  <p>
    {statusCode
      ? `Oho! An error ${statusCode} occurred on server`
      : "An error occurred on client"}
  </p>
);

Error.getInitialProps = ({
  res,
  err,
}: {
  res: any;
  err: ErrorType;
}): ErrorType => {
  let rv: ErrorType = { statusCode: 404 };
  if (res) {
    rv = res;
  } else if (err) {
    rv = err;
  }

  return rv;
};

export default Error;

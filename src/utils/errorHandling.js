
export const asyncHandler = (fn) => (req, res, next) =>
  fn(req, res).catch((error) => {
    console.log({error: JSON.stringify(error),errorMsg :JSON.parse(error?.response?.data||error)})
    return next(error);
  });


export const errorHandling = (error, req, res, next) => {
  const statusCode = error.cause || 500;
  return res.status(statusCode).json({ error: error.message });
};


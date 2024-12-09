
export const asyncHandler = (fn) => (req, res, next) =>
  fn(req, res).catch((error) => next(new Error(error, { cause: 500 })));


export const errorHandling = (error, req, res, next) => {
  const statusCode = error.cause || 500;
  return res.status(statusCode).json({ error: error.message });
};


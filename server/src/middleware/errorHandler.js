export const notFound = (req, res) => {
  res.status(404).json({ message: 'Route not found.' });
};

export const errorHandler = (error, req, res, next) => {
  const status = error.status || 500;
  const message = status === 500 ? 'Something went wrong. Please try again.' : error.message;

  if (status === 500) {
    console.error(error);
  }

  res.status(status).json({ message });
};

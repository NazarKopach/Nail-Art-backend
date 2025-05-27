import createHttpError from 'http-errors';

export const contactsStart = (req, res) => {
  res.json({
    message: 'Start work',
  });
};

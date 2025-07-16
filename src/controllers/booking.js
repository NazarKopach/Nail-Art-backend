import createHttpError from 'http-errors';

import * as bookingServices from '../services/booking.js';

export const getBookingController = async (req, res) => {
  const userId = req.user._id;
  const bookings = await bookingServices.getBookingByUser(userId);
  res.json({
    status: 200,
    message: 'Successfully found booking',
    bookings,
  });
};

export const addBookingController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await bookingServices.addBooking({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully add booking',
    data,
  });
};

export const deleteBookingController = async (req, res) => {
  const { id } = req.params;
  const data = await bookingServices.deleteBooking({ _id: id });

  if (!data) {
    throw createHttpError(404, `Booking with ${id} not found`);
  }

  res.status(204).send();
};

import createHttpError from 'http-errors';

import * as bookingServices from '../services/booking.js';

export const getAllBookingsController = async (req, res) => {
  const bookings = await bookingServices.getAllBookings();
  res.json({
    status: 200,
    message: 'Successfully found Allbooking',
    bookings,
  });
};

export const getBookingByIdController = async (req, res) => {
  const userId = req.user._id;
  const bookings = await bookingServices.getBookingByUser(userId);
  res.json({
    status: 200,
    message: 'Successfully found booking',
    bookings,
  });
};

export const getBookingReservedDateController = async (req, res) => {
  const bookings = await bookingServices.getAllBookings();
  const reservation = bookings.map((item) => {
    const reservedTime = item.time;
    const reservedDate = new Date(item.date)
      .toLocaleDateString()
      .split('.')
      .reverse()
      .join('-');
    return { time: reservedTime, date: reservedDate };
  });
  res.json({
    status: 200,
    message: 'Successfully found reserved bookings',
    reservation,
  });
};

export const addBookingController = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { date, time } = req.body;

    const isTaken = await bookingServices.isSlotTaken({ date, time });

    if (isTaken) {
      throw createHttpError(
        409,
        'This slot is already taken. Please select a different time or date',
      );
    }

    const data = await bookingServices.addBooking({ ...req.body, userId });

    res.status(201).json({
      status: 201,
      message: 'The reservation was created successfully',
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBookingController = async (req, res) => {
  const { id } = req.params;
  const data = await bookingServices.deleteBooking({ _id: id });

  if (!data) {
    throw createHttpError(404, `Booking with ${id} not found`);
  }

  res.status(204).send();
};

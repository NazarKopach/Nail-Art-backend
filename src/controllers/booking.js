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
    const reservedDate = item.date;
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

export const patchContactsControlls = async (req, res) => {
  const { id: _id } = req.params;
  const { _id: userId } = req.user;
  const response = await bookingServices.updateContacts(
    { _id, userId },
    req.body,
  );

  if (!response) throw createHttpError(404, 'Bookings not found');

  res.json({
    status: 200,
    message: 'Successfully patched a bookings!',
    data: response.data,
  });
};

export const upsertContactsController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const { isNew, data } = await bookingServices.updateContacts(
    { _id: id },
    { ...req.body, userId },
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upsert bookings',
    data,
  });
};

export const one = () => {};

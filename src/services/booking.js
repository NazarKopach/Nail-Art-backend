import Bookings from '../db/models/Booking.js';

export const getBooking = () => Bookings.find();

export const getBookingByUser = async (userId) => {
  return await Bookings.find({ userId });
};

export const addBooking = (payload) => Bookings.create(payload);

export const deleteBooking = (filter) => Bookings.findByIdAndDelete(filter);

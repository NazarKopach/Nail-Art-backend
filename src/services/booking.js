import Bookings from '../db/models/Booking.js';

export const getBooking = () => Bookings.find();

export const postBooking = () => {};

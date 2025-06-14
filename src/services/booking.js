import Bookings from '../db/models/Booking.js';

export const getBooking = () => Bookings.find();

export const addBooking = (payload) => Bookings.create(payload);

export const deleteBooking = (filter) => Bookings.findByIdAndDelete(filter);

// export const addBooking = async (req, res) => {
//   const { clientName, clientEmail, date, time } = req.body;

//   const exists = await Bookings.findOne({ date, time });
//   if (exists) {
//     return res.status(400).json({ message: 'Слот зайнятий' });
//   }

//   const newBooking = new Bookings({ clientName, clientEmail, date, time });
//   await newBooking.save();
//   res.status(201).json(newBooking);
// };

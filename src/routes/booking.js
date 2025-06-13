import { Router } from 'express';

import * as bookingServices from '../services/booking.js';

const bookingRouters = Router();

bookingRouters.get('/', async (req, res) => {
  const data = await bookingServices.getBooking();
  res.json({
    status: 200,
    message: 'Successfully found booking',
    data,
  });
});

// app.post('/bookings', async (req, res) => {
//   const { clientName, clientEmail, date, time } = req.body;

//   const exists = await Bookings.findOne({ date, time });
//   if (exists) {
//     return res.status(400).json({ message: 'Слот зайнятий' });
//   }

//   const newBooking = new Bookings({ clientName, clientEmail, date, time });
//   await newBooking.save();
//   res.status(201).json(newBooking);
// });

export default bookingRouters;

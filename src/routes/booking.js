import { Router } from 'express';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import * as bookingController from '../controllers/booking.js';

const bookingRouters = Router();

bookingRouters.use(authenticate);

bookingRouters.get('/', ctrWrapper(bookingController.getAllBookingsController));

bookingRouters.get(
  '/user-by-id',
  ctrWrapper(bookingController.getBookingByIdController),
);

bookingRouters.get(
  '/get-reservation',
  ctrWrapper(bookingController.getBookingReservedDateController),
);

bookingRouters.get(
  '/reserved-date',
  ctrWrapper(bookingController.getBookingReservedDateController),
);

bookingRouters.post('/', ctrWrapper(bookingController.addBookingController));

bookingRouters.delete(
  '/:id',
  ctrWrapper(bookingController.deleteBookingController),
);

export default bookingRouters;

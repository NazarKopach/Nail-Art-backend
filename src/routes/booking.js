import { Router } from 'express';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';

import * as bookingController from '../controllers/booking.js';

const bookingRouters = Router();

bookingRouters.use(authenticate);

bookingRouters.get('/', ctrWrapper(bookingController.getBookingController));

bookingRouters.post('/', ctrWrapper(bookingController.addBookingController));

bookingRouters.delete(
  '/:id',
  ctrWrapper(bookingController.deleteBookingController),
);

export default bookingRouters;

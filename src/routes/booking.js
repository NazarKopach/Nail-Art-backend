import { Router } from 'express';
import { ctrWrapper } from '../utils/ctrWrapper.js';
import { authenticate } from '../middlewares/authenticate.js';
// import { validateBody } from '../utils/validateBody.js';
// import { bookingSchema, bookingUpdateSchema } from '../validation/booking.js';
import { isValidId } from '../middlewares/isValidId.js';
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

bookingRouters.post(
  '/',
  // validateBody(bookingSchema),
  ctrWrapper(bookingController.addBookingController),
);

bookingRouters.delete(
  '/:id',
  ctrWrapper(bookingController.deleteBookingController),
);

bookingRouters.patch(
  '/:id',
  isValidId,
  // validateBody(bookingUpdateSchema),
  ctrWrapper(bookingController.patchContactsControlls),
);

bookingRouters.put(
  '/:id',
  isValidId,
  // validateBody(bookingSchema),
  ctrWrapper(bookingController.upsertContactsController),
);

export default bookingRouters;

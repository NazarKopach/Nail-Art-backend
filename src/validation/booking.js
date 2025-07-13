import Joi from 'joi';

import { emailRegex } from '../constants/user';

export const bookingSchema = Joi.object({
  clientName: Joi.string(),
  clientEmail: Joi.string().pattern(emailRegex),
  phoneNumber: Joi.string().min(3).max(20),
  date: Joi.string(),
  time: Joi.string(),
  status: Joi.string(),
});

import Joi from 'joi';
import { typeList } from '../constants/bookings';

export const bookingSchema = Joi.object({
  clientName: Joi.string().required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  serviceType: Joi.string()
    .valid(...typeList)
    .default('nail'),
  time: Joi.string().required(),
  date: Joi.string().required(),
});

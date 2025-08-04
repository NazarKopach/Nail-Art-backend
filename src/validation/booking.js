import Joi from 'joi';
import { extra, services } from '../constants/bookings';

export const bookingSchema = Joi.object({
  clientName: Joi.string().required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  serviceType: Joi.string()
    .valid(...services)
    .default('Manicure hybrydowy')
    .required(),
  dodatek: Joi.string()
    .valid(...extra, '')
    .default(''),
  time: Joi.string().required(),
  date: Joi.string().required(),
});

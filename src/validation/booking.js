import Joi from 'joi';
import { extra, services } from '../constants/bookings';

export const bookingSchema = Joi.object({
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

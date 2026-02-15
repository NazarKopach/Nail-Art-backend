import Joi from 'joi';
import { extra, services } from '../constants/bookings.js';

export const bookingSchema = Joi.object({
  serviceType: Joi.string()
    .valid(...services)
    .default('Manicure hybrydowy')
    .required(),
  dodatek: Joi.string().valid(...extra),
  time: Joi.string().required(),
  date: Joi.string().required(),
  src: Joi.string().required(),
  price: Joi.string().required(),
});

export const bookingUpdateSchema = Joi.object({
  serviceType: Joi.string()
    .valid(...services)
    .default('Manicure hybrydowy')
    .required(),
  dodatek: Joi.string().valid(...extra),
  time: Joi.string().required(),
  date: Joi.string().required(),
  src: Joi.string().required(),
  price: Joi.string().required(),
});

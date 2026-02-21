import Joi from 'joi';
import { services } from '../constants/bookings.js';

export const bookingSchema = Joi.object({
  serviceType: Joi.string()
    .valid(...services)
    .default('Manicure hybrydowy')
    .required(),
  dodatek: Joi.array(),
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
  dodatek: Joi.array()
    .items(
      Joi.object({
        idDodatek: Joi.number().required(),
        servicesDodatek: Joi.string().required(),
        priceDodatek: Joi.number().required(),
        srcDodatek: Joi.string().required(),
      }),
    )
    .default([]),
  time: Joi.string().required(),
  date: Joi.string().required(),
  src: Joi.string().required(),
  price: Joi.string().required(),
});

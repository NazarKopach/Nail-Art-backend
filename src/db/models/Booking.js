import { Schema, model } from 'mongoose';

const bookingSchema = new Schema(
  {
    clientName: String,
    clientEmail: String,
    date: String,
    time: String,
    status: { type: String, default: 'active' },
  },
  { versionKey: false, timestamps: true },
);

const Bookings = model('booking', bookingSchema);

export default Bookings;

import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';
import { typeList } from '../../constants/bookings.js';

const bookingSchema = new Schema(
  {
    clientName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    serviceType: { type: String, default: 'nail', enum: typeList },
    time: { type: String, required: true },
    date: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

bookingSchema.post('save', handleSaveError);

bookingSchema.pre('findOneAndUpdate', setUpdateSetting);

bookingSchema.post('findOneAndUpdate', handleSaveError);

const Bookings = model('booking', bookingSchema);

export default Bookings;

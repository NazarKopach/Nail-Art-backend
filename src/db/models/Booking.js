import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';
import { typeList, typeStatus } from '../../constants/bookings.js';

const bookingSchema = new Schema(
  {
    clientName: String,
    clientEmail: String,
    phoneNumber: String,
    serviceType: { type: String, default: 'nail', enum: typeList },
    date: String,
    time: String,
    status: { type: String, default: 'active', enum: typeStatus },
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

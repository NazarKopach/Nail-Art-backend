import { Schema, model } from 'mongoose';
import { handleSaveError, setUpdateSetting } from './hooks.js';
import { services } from '../../constants/bookings.js';

const dodatekSchema = new Schema(
  {
    idDodatek: { type: Number, required: true },
    servicesDodatek: { type: String, required: true },
    priceDodatek: { type: String, required: true },
    srcDodatek: { type: String, required: true },
  },
  { _id: false },
);

const bookingSchema = new Schema(
  {
    serviceType: {
      type: String,
      default: 'Manicure hybrydowy',
      enum: services,
      required: true,
    },
    dodatek: { type: [dodatekSchema], default: [] },
    time: { type: String, required: true },
    date: { type: String, required: true },
    src: { type: String, required: true },
    price: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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

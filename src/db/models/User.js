import { Schema, model } from 'mongoose';

import { handleSaveError, setUpdateSetting } from './hooks.js';

import { emailRegex, phoneRegex } from '../../constants/user.js';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      match: emailRegex,
      required: true,
    },
    password: { type: String, required: true },
    phone: { type: String, unique: true, match: phoneRegex, required: true },
    token: { type: String },
  },
  { versionKey: false, timestamps: true },
);

userSchema.post('save', handleSaveError);

userSchema.pre('findOneAndUpdate', setUpdateSetting);

userSchema.post('findOneAndUpdate', handleSaveError);

const User = model('user', userSchema);

export default User;

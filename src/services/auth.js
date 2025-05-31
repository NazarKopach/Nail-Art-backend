import User from '../db/models/User.js';
import Sessiongti from '../db/models/Session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';

export const register = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (user) {
    throw createHttpError(409, 'User alredy exist');
  }

  const hasPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...payload, password: hasPassword });

  return newUser;
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Enail or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw createHttpError(401, 'Enail or password invalid');
  }
};

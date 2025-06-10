import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { validateCode } from '../utils/googleOauth2.js';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';

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

  await Session.deleteOne({ userId: user._id });

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return Session.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: Date.now() + accessTokenLifeTime,
    refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
  });
};

export const loginOrRegisterWithGoogle = async (code) => {
  const loginTicked = await validateCode(code);
};

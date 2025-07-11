import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import { randomBytes } from 'crypto';
import {
  validateCode,
  getUserNameFromGoogleTokenPayload,
} from '../utils/googleOauth2.js';

import {
  accessTokenLifeTime,
  refreshTokenLifeTime,
} from '../constants/user.js';

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, getEnvVar('JWT_TOKEN'), {
    expiresIn: '15m',
  });
};

const createSessionData = (userId) => ({
  accessToken: generateAccessToken(userId),
  refreshToken: randomBytes(30).toString('base64'),
  accessTokenValidUntil: Date.now() + accessTokenLifeTime,
  refreshTokenValidUntil: Date.now() + refreshTokenLifeTime,
});

export const register = async (payload) => {
  const { email, password } = payload;

  const user = await User.findOne({ email });

  if (user) {
    throw createHttpError(409, 'User alredy exist');
  }

  const hasPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...payload, password: hasPassword });

  const sessionData = createSessionData(newUser._id);

  const session = await Session.create({
    userId: newUser._id,
    ...sessionData,
  });

  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    sessionId: session._id,
    user: {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
  };
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

  const sessionData = createSessionData(user._id);

  return Session.create({
    userId: user._id,
    ...sessionData,
  });
};

export const refreshToken = async (payload) => {
  const session = await Session.findOne({
    _id: payload.sessionId,
    refreshToken: payload.refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  if (Date.now() > session.refreshTokenValidUntil) {
    throw createHttpError(401, 'Refresh token expired');
  }

  const sessionData = createSessionData(session.userId);

  const updatedSession = await Session.findOneAndUpdate(
    { _id: payload.sessionId },
    {
      ...sessionData,
    },
    { new: true },
  );

  return updatedSession;
};

export const loginOrRegisterWithGoogle = async (code) => {
  const loginTicked = await validateCode(code);
  const payload = loginTicked.getPayload();

  let user = await User.findOne({ email: payload.email });
  const password = await bcrypt.hash(randomBytes(10).toString('base64'), 10);

  if (!user) {
    const name = getUserNameFromGoogleTokenPayload(payload);
    user = await User.create({
      email: payload.email,
      name,
      password,
    });
  }

  const sessionData = createSessionData(user._id);

  return Session.create({
    userId: user._id,
    ...sessionData,
  });
};

export const logout = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const getUser = (filter) => Session.findOne(filter);

export const getSession = (filter) => Session.findOne(filter);

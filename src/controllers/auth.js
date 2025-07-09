import * as authServices from '../services/auth.js';

import { generateOauthUrl } from '../utils/googleOauth2.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res, next) => {
  try {
    await authServices.register(req.body);

    res.status(201).json({
      status: 201,
      message: 'Successfully register user',
    });
  } catch (error) {
    next(error);
  }
};

export const getOauthGoogleController = async (req, res) => {
  const url = generateOauthUrl();

  res.json({
    status: 200,
    message: 'Successfully get Googlr Oauth url',
    data: {
      url,
    },
  });
};

export const loginWhitGoogleController = async (req, res) => {
  const { code } = req.body;

  const session = await authServices.loginOrRegisterWithGoogle(code);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully login user whit Google OAuth',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.cookie('sessionId', session._id.toString(), {
    httpOnly: true,
    expires: new Date(session.refreshTokenValidUntil),
  });

  res.json({
    status: 200,
    message: 'Successfully login user',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;

  const session = await authServices.refreshToken({ refreshToken, sessionId });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refresh session',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logout(req.cookies.sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

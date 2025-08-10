import * as authServices from '../services/auth.js';

import { generateOauthUrl } from '../utils/googleOauth2.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res, next) => {
  try {
    const {
      accessToken,
      refreshToken,
      sessionId,
      refreshTokenValidUntil,
      user,
    } = await authServices.register(req.body);

    setupSession(res, {
      refreshToken,
      id: sessionId,
      refreshTokenValidUntil,
    });

    res.status(201).json({
      data: {
        accessToken,
        sessionId,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserInfoController = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;
    if (!sessionId) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await authServices.getUserBySession(sessionId);

    res.json({
      status: 200,
      message: 'Successfully fetched user profile',
      data: user,
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
  setupSession(res, session);

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

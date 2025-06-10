import * as authServices from '../services/auth.js';

import { generateOauthUrl } from '../utils/googleOauth2.js';

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

  ///// corect session !!!!

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

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

  ///// corect session !!!!

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully login user',
    data: {
      accessToken: session.accessToken,
    },
  });
};

import { Router } from 'express';

import * as authController from '../controllers/auth.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';

import {
  authLoginSchema,
  authRegisterSchema,
  googleOauthSchema,
} from '../validation/auth.js';

import { validateBody } from '../utils/validateBody.js';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrWrapper(authController.registerController),
);

authRoutes.get('/user', ctrWrapper(authController.getUserInfoController));

authRoutes.get(
  '/get-oauth-url',
  ctrWrapper(authController.getOauthGoogleController),
);

authRoutes.post(
  '/confirm-oauth',
  validateBody(googleOauthSchema),
  ctrWrapper(authController.loginWhitGoogleController),
);

authRoutes.post(
  '/login',
  validateBody(authLoginSchema),
  ctrWrapper(authController.loginController),
);

authRoutes.post('/refresh', ctrWrapper(authController.refreshTokenController));

authRoutes.post('/logout', ctrWrapper(authController.logoutController));

export default authRoutes;

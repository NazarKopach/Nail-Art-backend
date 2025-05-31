import { Router } from 'express';

import * as authController from '../controllers/auth.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';

import { authLoginSchema, authRegisterSchema } from '../validation/auth.js';

import { validateBody } from '../utils/validateBody.js';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrWrapper(authController.registerController),
);

authRoutes.post(
  '/login',
  validateBody(authLoginSchema),
  ctrWrapper(authController.loginController),
);

export default authRoutes;

import { Router } from 'express';

import * as authController from '../controllers/auth.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';

import { authRegisterSchema } from '../validation/auth.js';

import { validateBody } from '../utils/validateBody.js';

const authRoutes = Router();

authRoutes.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrWrapper(authController.registerController),
);

export default authRoutes;

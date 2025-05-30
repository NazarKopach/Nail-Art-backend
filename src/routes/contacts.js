import { Router } from 'express';

import { isValidId } from '../middlewares/isValidId.js';

import * as contactsControllers from '../controllers/contacts.js';

import { ctrWrapper } from '../utils/ctrWrapper.js';

const contactsRoutes = Router();

contactsRoutes.get('/', ctrWrapper(contactsControllers.contactsStart));

export default contactsRoutes;

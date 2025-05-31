import * as authServices from '../services/auth.js';

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

export const loginController = async (req, res) => {};

import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

const register = async (req, res) => {
  logger.log('debug', 'register: %j', req.body);
  await UserModel.save({
    username: req.body.username,
    email: req.body.email,
    rehashedPassword: req.body.rehashedPassword,
  }).catch(error => {
    throw new AppError(error.message, 400);
  });
  logger.log('info', `Welcome to this awsome comunity ${req.body.username}`);
  res.status(200).send({ payload: { message: 'Successfully registered' } });
};
export { register };
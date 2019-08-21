import jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import * as UserModel from '../models/UserModel';

const logger = require('../utils/logger')('logController');

const logIn = async (req, res) => {
    logger.log ('debug', 'login: %', req.body);
    const user = await UserModel.getUserByEmail(req.body.email);
    if (user) {
       const passwordMatch = await UserModel.comparePassword({
           userPassword: req.body.hashedPassword,
           rehasedPassword: req.body.rehasedPassword
       });
       if (passwordMatch) {
           const token = jwt.sign (
               {
                   data: {username: user.username},
               },
               process.env.JWT_SECRET,
               { expireIn: '3h'}
           )
           logger.log('info', `Welcome ${user.username}`);
      res.status(200).send({ payload: { message: 'Successfully loged in', token } });
            }
       } else {
           logger.log('debug', 'Login Failed') 
           throw new AppError('Upss... Something dose not match! Please check your details.', 400);
    };
};

export { logIn }
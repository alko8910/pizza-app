import User from '../models/user.model';
import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../config/config';

const signin = (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (err || !user) return res.send({ error: 'User not found' });
    if (!user.authenticate(req.body.password)) {
      return res.send({ error: 'Email and password do not match' });
    }

    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      expiration: Date.now() + 1200000,
    };
    const token = jwt.sign(JSON.stringify(payload), config.jwtSecret);

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: false,
    });

    res.send({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  });
};

const signout = (req, res) => {
  res.clearCookie('jwt');
  res.send({ message: 'User signed out' });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  algorithms: ['HS256'],
  userProperty: 'auth',
});

const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!authorized) return res.status(403).json('User is not authorized!');
  next();
};

export default { signin, signout, requireSignin, hasAuthorization };

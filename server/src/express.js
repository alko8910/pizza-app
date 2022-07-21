import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport'

import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import doughRoutes from './routes/dough.routes';
import ingredientsRoutes from './routes/ingredients.routes';
import orderRoutes from './routes/order.routes';
import addressRoutes from './routes/address.routes';

import './middleware/passport'

require('babel-core/register');
require('babel-polyfill');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize())
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/', userRoutes);
app.use('/', authRoutes);
app.use('/', doughRoutes);
app.use('/', ingredientsRoutes);
app.use('/', orderRoutes);
app.use('/', addressRoutes);

app.get('/', (req, res) => {
  res.status(200).send(Template());
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: err.name + ': ' + err.message });
  }
});

export default app;

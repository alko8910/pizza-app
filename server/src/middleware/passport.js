require('dotenv').config()
import passport from 'passport';
import passportJWT from 'passport-jwt';
const JWTStrategy = passportJWT.Strategy;


const secret = process.env.JWT_SECRET;
console.log(secret);

const cookieExtractor = (req) => {
  let jwt = null;

  if (req && req.cookies) {
    jwt = req.cookies['userToken'];
  }
  return jwt;
};

passport.use(
  'userToken',
  new JWTStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    },
    (jwtPayload, done) => {
      const { expiration } = jwtPayload;

      if (Date.now() > expiration) {
        done('Unauthorized', false);
      }

      done(null, jwtPayload);
    }
  )
);
import pool from './db';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import bcrypt from 'bcryptjs';
import { Request } from 'express';

passport.use(
  new LocalStrategy((username, password, cb) => {
    pool
      .query('SELECT * FROM users WHERE username = $1', [username])
      .then((res) => {
        const user = res.rows[0];

        if (!user) {
          return cb(null, false, {
            message: 'Incorrect username.',
          });
        }

        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // Passwords match
            return cb(null, user, {
              message: 'Logged In Successfully',
            });
          } else {
            // Passwords do not match
            return cb(null, false, {
              message: 'Incorrect password',
            });
          }
        });
      })
      .catch((err) => cb(err));
  })
);

const cookieExtractor = (req: Request) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.SECRET_KEY,
};

passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      const user = await pool.query('SELECT * FROM users WHERE id = $1', [
        jwtPayload.id,
      ]);
      return done(null, user.rows[0]);
    } catch (err) {
      return done(err);
    }
  })
);

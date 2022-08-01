import pool from '../config/db';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { User, UserAuthInfoRequest } from '../types';

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;

  const response = await pool.query('SELECT * FROM users WHERE id = $1', [
    userId,
  ]);
  const user = response.rows[0];

  res.json({
    user,
  });
};

export const getCurrentUser = [
  passport.authenticate('jwt', { session: false }),

  (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
    res.json({ user: { id: req.user.id, username: req.user.username } });
  },
];

export const createUser = [
  body(
    'username',
    'Username must be specified and be at least 3 and no more than 20 characters'
  )
    .trim()
    .isLength({ min: 3, max: 20 })
    .escape(),
  body('password', 'You must have a password').trim().isLength({ min: 1 }),
  body('confirmPassword').custom((value: string, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Indicates success of this synchronous custom validator
    return true;
  }),

  (req: Request, res: Response, next: NextFunction) => {
    bcrypt.hash(
      req.body.password,
      10,
      async (err: Error, hashedPassword: string) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res
            .status(400)
            .json({ message: 'Something is not right', errors });
        } else {
          const existingUser = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [req.body.username]
          );

          if (existingUser.rows.length > 0) {
            return res.status(400).json({
              message: 'A user with this username already exists',
            });
          } else {
            const user = await pool.query(
              'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *',
              [req.body.username, hashedPassword]
            );

            res.json({
              username: user.rows[0].username,
            });
          }
        }
      }
    );
  },
];

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: User, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user: user,
          info,
        });
      }

      req.login(user, { session: false }, (err: Error) => {
        if (err) {
          res.send(err);
        }

        // generate a signed on web token with the contents
        // of user object and return it in the response

        const token = jwt.sign(user, process.env.SECRET_KEY as string, {
          expiresIn: '1h',
        });

        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

        return res.json({
          user: { id: user.id, username: user.username },
          token,
        });
      });
    }
  )(req, res);
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  // Remove the token cookie
  res.cookie('token', '', { httpOnly: true, maxAge: 1 });
  res.json({ message: 'Token cookie has been destroyed' });
};

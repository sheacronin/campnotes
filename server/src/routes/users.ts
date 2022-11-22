import express from 'express';
const router = express.Router();
import { Request, Response, NextFunction } from 'express';
import { User, UserAuthInfoRequest } from '../types';
import passport from 'passport';
import UsersController from '../controllers/usersController';
import UsersDao from '../daos/usersDao';
import { validationResult } from 'express-validator';
import { validateUser } from '../validation/usersValidation';
import jwt from 'jsonwebtoken';

const usersController = new UsersController(new UsersDao());

router.get('/current-user', [
  passport.authenticate('jwt', { session: false }),
  (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
      const user = usersController.getCurrentUser(
        req.user.id,
        req.user.username
      );
      res.json({ user });
    } catch (error) {
      console.error(error);
    }
  },
]);

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = Number(id);
    const user = await usersController.getUser(userId);
    res.json({
      user,
    });
  } catch (error) {
    console.error(error);
  }
});

router.post('/', [
  ...validateUser,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ message: 'Something is not right', errors });
    } else {
      const usernameTaken = await usersController.checkIfUsernameTaken(
        req.body.username
      );
      if (usernameTaken) {
        return res.status(400).json({
          message: 'A user with this username already exists',
        });
      } else {
        const user = await usersController.createUser(
          req.body.username,
          req.body.password
        );
        res.json({
          username: user.username,
        });
      }
    }
  },
]);

router.post('/login', (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false },
    (err: Error, user: User, info) => {
      if (err || !user) {
        return res.status(400).json({
          message: 'Something is not right',
          user,
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
});

router.post('/logout', (req, res, next) => {
  // Remove the token cookie
  res.cookie('token', '', { httpOnly: true, maxAge: 1 });
  res.json({ message: 'Token cookie has been destroyed' });
});

export default router;

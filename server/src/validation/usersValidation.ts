import { body } from 'express-validator';

export const validateUser = [
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
];

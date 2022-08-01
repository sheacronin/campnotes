import express from 'express';
import {
  createUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getUser,
} from '../controllers/userController';
const router = express.Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/current-user', getCurrentUser);
router.get('/:userId', getUser);

export default router;

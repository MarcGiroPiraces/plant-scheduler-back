import express from 'express';
import {
  deleteUser,
  getAllUsers,
  loginUser,
  registerUser,
  updateUser,
} from '../controllers/users';
import {
  checkUserLoginCredentialsMiddleware,
  checkCreateUserBodyMiddleware,
  checkLoginUserBodyMiddleware,
  checkUniqueEmailMiddleware,
  checkUpdateUserBodyMiddleware,
} from '../middlewares/users';
import { auth } from '../middlewares/auth';

export const router = express.Router();

router.get('/', auth, getAllUsers);

router.post(
  '/register',
  checkCreateUserBodyMiddleware,
  checkUniqueEmailMiddleware,
  registerUser,
);

router.post(
  '/login',
  checkLoginUserBodyMiddleware,
  checkUserLoginCredentialsMiddleware,
  loginUser,
);

router.put('/', auth, checkUpdateUserBodyMiddleware, updateUser);

router.delete('/', auth, deleteUser);

export default router;

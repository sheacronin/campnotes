import bcrypt from 'bcryptjs';
import UsersDao from '../daos/usersDao';

class UsersController {
  usersDao: UsersDao;

  constructor(usersDao: UsersDao) {
    this.usersDao = usersDao;
  }

  getUser = async (id: number) => {
    return await this.usersDao.getUserById(id);
  };

  getCurrentUser = (id: number, username: string) => {
    const user = { id, username };
    return user;
  };

  checkIfUsernameTaken = async (username: string) => {
    const existingUser = await this.usersDao.getUserByUsername(username);
    return existingUser ? true : false;
  };

  createUser = async (username: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.usersDao.createUser(username, hashedPassword);
  };
}

export default UsersController;

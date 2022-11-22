import pool from '../config/db';

class UsersDao {
  getUserById = async (id: number) => {
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return user.rows[0];
  };

  getUserByUsername = async (username: string) => {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    return user.rows[0];
  };

  createUser = async (username: string, password: string) => {
    const user = await pool.query(
      'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *',
      [username, password]
    );
    return user.rows[0];
  };
}

export default UsersDao;

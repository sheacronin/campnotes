import express from 'express';
const router = express.Router();
import pool from '../config/db';
import { UserAuthInfoRequest, User } from '../types';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

// Get current user's campaigns
router.get('/', [
  passport.authenticate('jwt', { session: false }),

  async (req: UserAuthInfoRequest, res: Response) => {
    try {
      const allCurrentUserCampaigns = await pool.query(
        'SELECT * FROM campaigns WHERE game_master_id = $1',
        [req.user.id]
      );
      res.json(allCurrentUserCampaigns.rows);
    } catch (error) {
      console.error(error);
    }
  },
]);

router.post('/', [
  passport.authenticate('jwt', { session: false }),

  async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body;
      const newCampaign = await pool.query(
        'INSERT INTO campaigns (title, game_master_id) VALUES($1, $2) RETURNING *',
        [title, req.user.id]
      );

      res.json(newCampaign.rows[0]);
    } catch (error) {
      console.error(error);
    }
  },
]);

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updateCampaign = await pool.query(
      'UPDATE campaigns SET title = $1 WHERE id = $2 RETURNING *',
      [title, id]
    );

    res.json(updateCampaign.rows[0]);
  } catch (error) {
    console.error(error);
  }
});

export default router;

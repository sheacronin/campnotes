import express from 'express';
const router = express.Router();
import { UserAuthInfoRequest, User } from '../types';
import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import CampaignsController from '../controllers/campaignsController';
import CampaignsDao from '../daos/campaignsDao';

const campaignsController = new CampaignsController(new CampaignsDao());

router.get('/', [
  passport.authenticate('jwt', { session: false }),

  async (req: UserAuthInfoRequest, res: Response) => {
    try {
      const { id } = req.user;
      const allCurrentUserCampaigns =
        await campaignsController.getAllCampaignsByGameMaster(id);
      res.json(allCurrentUserCampaigns);
    } catch (error) {
      console.error(error);
    }
  },
]);

router.post('/', [
  passport.authenticate('jwt', { session: false }),

  async (req: UserAuthInfoRequest, res: Response, next: NextFunction) => {
    try {
      const { id } = req.user;
      const newCampaign = await campaignsController.createCampaign({
        ...req.body,
        gameMasterId: id,
      });
      res.status(201).json(newCampaign);
    } catch (error) {
      console.error(error);
    }
  },
]);

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const campaignId = Number(id);
    const updatedCampaign = await campaignsController.updateCampaign(
      campaignId,
      req.body
    );
    res.json(updatedCampaign);
  } catch (error) {
    console.error(error);
  }
});

export default router;

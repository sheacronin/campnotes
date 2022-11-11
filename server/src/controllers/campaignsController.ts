import CampaignsDao, { Campaign } from '../daos/campaignsDao';

class CampaignsController {
  campaignsDao: CampaignsDao;

  constructor(campaignsDao: CampaignsDao) {
    this.campaignsDao = campaignsDao;
  }

  getAllCampaignsByGameMaster = async (gameMasterId: number) => {
    return await this.campaignsDao.getAllCampaignsByGameMaster(gameMasterId);
  };

  createCampaign = async (campaign: Campaign) => {
    return await this.campaignsDao.createCampaign(campaign);
  };

  updateCampaign = async (id: number, campaign: Campaign) => {
    return await this.campaignsDao.updateCampaign(id, campaign);
  };
}

export default CampaignsController;

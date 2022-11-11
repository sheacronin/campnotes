import pool from '../config/db';

export interface Campaign {
  title: string;
  gameMasterId: number;
}

class CampaignsDao {
  getAllCampaignsByGameMaster = async (gameMasterId: number) => {
    const allCampaignsByGameMaster = await pool.query(
      'SELECT * FROM campaigns WHERE game_master_id = $1',
      [gameMasterId]
    );
    return allCampaignsByGameMaster.rows;
  };

  createCampaign = async (campaign: Campaign) => {
    const { title, gameMasterId } = campaign;
    const newCampaign = await pool.query(
      'INSERT INTO campaigns (title, game_master_id) VALUES($1, $2) RETURNING *',
      [title, gameMasterId]
    );
    return newCampaign.rows[0];
  };

  updateCampaign = async (id: number, campaign: Campaign) => {
    const { title } = campaign;
    const updatedCampaign = await pool.query(
      'UPDATE campaigns SET title = $1 WHERE id = $2 RETURNING *',
      [title, id]
    );
    return updatedCampaign.rows[0];
  };
}

export default CampaignsDao;

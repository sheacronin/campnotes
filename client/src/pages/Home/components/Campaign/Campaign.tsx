import React, { useState } from 'react';
import { ICampaign } from './useCampaigns';
import EditCampaign from './EditCampaign';

interface CampaignProps {
  campaign: ICampaign;
  addCampaign: Function;
  editCampaign: Function;
}

function Campaign({ campaign, addCampaign, editCampaign }: CampaignProps) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <EditCampaign
      campaign={campaign}
      setIsEditing={setIsEditing}
      addCampaign={addCampaign}
      editCampaign={editCampaign}
    />
  ) : (
    <article className="campaign">
      <h3>{campaign.title}</h3>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </article>
  );
}

export default Campaign;

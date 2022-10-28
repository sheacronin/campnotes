import React, { useState } from 'react';
import { ICampaign } from '../../../../types';
import EditCampaign from './EditCampaign';

interface CampaignProps {
  campaign: ICampaign;
  setCampaigns: Function;
}

function Campaign({ campaign, setCampaigns }: CampaignProps) {
  const [isEditing, setIsEditing] = useState(false);

  return isEditing ? (
    <EditCampaign
      campaign={campaign}
      setIsEditing={setIsEditing}
      setCampaigns={setCampaigns}
    />
  ) : (
    <article className="campaign">
      <h3>{campaign.title}</h3>
      <button onClick={() => setIsEditing(true)}>Edit</button>
    </article>
  );
}

export default Campaign;

import React from 'react';
import { ICampaign } from './useCampaigns';
import EditCampaign from './EditCampaign';
import useEditForm from '../../../../useEditForm';

interface CampaignProps {
  campaign: ICampaign;
  addCampaign: (campaign: ICampaign) => void;
  editCampaign: (id: number, campaign: ICampaign) => void;
}

function Campaign({ campaign, addCampaign, editCampaign }: CampaignProps) {
  const { isEditing, onSubmitForm, openEditForm, closeEditForm } = useEditForm(
    addCampaign,
    editCampaign
  );

  return isEditing ? (
    <EditCampaign
      campaign={campaign}
      onSubmitForm={onSubmitForm}
      closeEditForm={closeEditForm}
    />
  ) : (
    <article className="campaign">
      <h3>{campaign.title}</h3>
      <button onClick={() => openEditForm()}>Edit</button>
    </article>
  );
}

export default Campaign;

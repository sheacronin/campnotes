import React, { useState } from 'react';
import { ICampaign } from './useCampaigns';

interface EditCampaignProps {
  campaign?: ICampaign;
  setIsEditing: Function;
  addCampaign: Function;
  editCampaign: Function;
}

function EditCampaign({
  campaign = { id: -1, title: '' },
  setIsEditing,
  addCampaign,
  editCampaign,
}: EditCampaignProps) {
  const [title, setTitle] = useState(campaign.title);

  async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = { title };

    if (campaign.id === -1) {
      // If no campaign (set default id to -1), post new campaign
      addCampaign(body);
    } else {
      // Else, edit the exisiting campaign
      editCampaign(campaign.id, body);
    }
    setIsEditing(false);
  }

  return (
    <article>
      <form onSubmit={onSubmitForm}>
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <button type="submit">Save Campaign</button>
        </div>
      </form>
      <button onClick={() => setIsEditing(false)}>Exit</button>
    </article>
  );
}

export default EditCampaign;

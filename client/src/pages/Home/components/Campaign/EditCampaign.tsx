import React, { useState } from 'react';
import { ICampaign } from './useCampaigns';

interface EditCampaignProps {
  campaign?: ICampaign;
  onSubmitForm: Function;
  closeEditForm: () => void;
}

function EditCampaign({
  campaign = { id: -1, title: '' },
  onSubmitForm,
  closeEditForm,
}: EditCampaignProps) {
  const [title, setTitle] = useState(campaign.title);

  return (
    <article>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitForm(campaign.id, { title });
        }}
      >
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
      <button onClick={() => closeEditForm()}>Exit</button>
    </article>
  );
}

export default EditCampaign;

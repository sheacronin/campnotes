import React, { useState } from 'react';
import { ICampaign } from '../types';

interface EditCampaignProps {
  campaign?: ICampaign;
  setIsEditing: Function;
  setCampaigns: Function;
}

function EditCampaign({
  campaign = { id: -1, title: '' },
  setIsEditing,
  setCampaigns,
}: EditCampaignProps) {
  const [title, setTitle] = useState(campaign.title);

  async function onSubmitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const body = { title };

    if (campaign.id === -1) {
      // If no campaign (set default id to -1), post new campaign
      try {
        const response = await fetch('http://localhost:5000/campaigns', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          credentials: 'include',
        });
        const data = await response.json();
        console.log(data);
        setCampaigns((prevState: ICampaign[]) => [...prevState, data]);
      } catch (error) {
        console.error(error);
      }
    } else {
      // Else, edit the exisiting character
      try {
        const response = await fetch(
          `http://localhost:5000/campaigns/${campaign.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        );
        const data = await response.json();
        console.log(data);
        setCampaigns((prevState: ICampaign[]) =>
          prevState.map((oldCharacter) =>
            oldCharacter.id === campaign.id ? data : oldCharacter
          )
        );
      } catch (error) {
        console.error(error);
      }
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

import { useState, useEffect, useCallback } from 'react';

export interface ICampaign {
  id: number;
  title: string;
}

const useCampaigns = () => {
  const [campaigns, setCampaigns] = useState<ICampaign[]>([]);

  const getCampaigns = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/campaigns', {
        credentials: 'include',
      });
      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const addCampaign = async (campaign: ICampaign) => {
    try {
      const response = await fetch('http://localhost:5000/campaigns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
        credentials: 'include',
      });
      const data = await response.json();
      setCampaigns((prevState) => [...prevState, data]);
    } catch (error) {
      console.error(error);
    }
  };

  const editCampaign = async (id: number, campaign: ICampaign) => {
    try {
      const response = await fetch(`http://localhost:5000/campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(campaign),
      });
      const updatedCampaign = await response.json();
      setCampaigns((prevState: ICampaign[]) =>
        prevState.map((oldCampaign) =>
          oldCampaign.id === id ? updatedCampaign : oldCampaign
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCampaigns();
  }, [getCampaigns]);

  return { campaigns, addCampaign, editCampaign };
};

export default useCampaigns;

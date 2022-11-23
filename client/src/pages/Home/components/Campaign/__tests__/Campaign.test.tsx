import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Campaign from '../Campaign';

describe('Campaign component', () => {
  const CAMPAIGN = {
    id: 1,
    title: 'Campaign',
  };
  const addCampaign = jest.fn();
  const editCampaign = jest.fn();

  it('renders correct heading', () => {
    render(
      <Campaign
        campaign={CAMPAIGN}
        addCampaign={addCampaign}
        editCampaign={editCampaign}
      />
    );
    expect(screen.getByRole('heading').textContent).toMatch(/Campaign/);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Campaign
        campaign={CAMPAIGN}
        addCampaign={addCampaign}
        editCampaign={editCampaign}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

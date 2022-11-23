import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Home';

describe('Campaign component', () => {
  const CAMPAIGNS = [
    { id: 1, title: 'Campaign1' },
    { id: 2, title: 'Campaign2' },
    { id: 3, title: 'Campaign3' },
  ];
  const addCampaign = jest.fn();
  const editCampaign = jest.fn();

  it('renders correct page heading', () => {
    render(
      <Home
        campaigns={CAMPAIGNS}
        addCampaign={addCampaign}
        editCampaign={editCampaign}
      />
    );
    expect(
      screen.getByRole('heading', { name: 'Campaigns' }).textContent
    ).toMatch(/Campaigns/);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Home
        campaigns={CAMPAIGNS}
        addCampaign={addCampaign}
        editCampaign={editCampaign}
      />
    );
    expect(container).toMatchSnapshot();
  });
});

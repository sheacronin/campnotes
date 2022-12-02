import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import useCampaigns from '../useCampaigns';

describe('useCampaigns hook', () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originFetch;
  });

  it('has the correct initial state', () => {
    const { result } = renderHook(() => useCampaigns());

    expect(result.current.campaigns).toEqual([]);
  });

  it('successfully adds a campaign', async () => {
    const { result } = renderHook(() => useCampaigns());

    await act(async () => {
      const fakeResponse = {
        id: 1,
        title: 'Campaign',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCampaign({
        id: 1,
        title: 'Campaign',
      });
    });

    expect(result.current.campaigns).toEqual([
      {
        id: 1,
        title: 'Campaign',
      },
    ]);
  });

  it('edits an existing campaign', async () => {
    const { result } = renderHook(() => useCampaigns());

    await act(async () => {
      const fakeResponse = {
        id: 1,
        title: 'Campaign',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCampaign({
        id: 1,
        title: 'Campaign',
      });
    });

    expect(result.current.campaigns).toEqual([
      {
        id: 1,
        title: 'Campaign',
      },
    ]);

    await act(async () => {
      const fakeResponse = {
        id: 1,
        title: 'New Title',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.editCampaign(1, {
        id: 1,
        title: 'New Title',
      });
    });

    expect(result.current.campaigns).toEqual([
      {
        id: 1,
        title: 'New Title',
      },
    ]);
  });

  it('edits only the selected campaign when there are many campaigns', async () => {
    const { result } = renderHook(() => useCampaigns());

    await act(async () => {
      const fakeResponse = {
        id: 1,
        title: 'Campaign1',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCampaign({
        id: 1,
        title: 'Campaign1',
      });
    });

    await act(async () => {
      const fakeResponse = {
        id: 2,
        title: 'Campaign2',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCampaign({
        id: 2,
        title: 'Campaign2',
      });
    });

    await act(async () => {
      const fakeResponse = {
        id: 3,
        title: 'Campaign3',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCampaign({
        id: 3,
        title: 'Campaign3',
      });
    });

    expect(result.current.campaigns).toEqual([
      {
        id: 1,
        title: 'Campaign1',
      },
      {
        id: 2,
        title: 'Campaign2',
      },
      {
        id: 3,
        title: 'Campaign3',
      },
    ]);

    await act(async () => {
      const fakeResponse = {
        id: 2,
        title: 'New Title',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.editCampaign(2, {
        id: 2,
        title: 'New Title',
      });
    });

    expect(result.current.campaigns).toEqual([
      {
        id: 1,
        title: 'Campaign1',
      },
      {
        id: 2,
        title: 'New Title',
      },
      {
        id: 3,
        title: 'Campaign3',
      },
    ]);
  });
});

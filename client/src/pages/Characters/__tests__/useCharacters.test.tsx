import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import useCharacters from '../useCharacters';

describe('useCharacters hook', () => {
  let originFetch: any;
  beforeEach(() => {
    originFetch = global.fetch;
  });
  afterEach(() => {
    global.fetch = originFetch;
  });

  it('has the correct initial state', () => {
    const { result } = renderHook(() => useCharacters());

    expect(result.current.characters).toEqual([]);
  });

  it('successfully adds a character', async () => {
    const { result } = renderHook(() => useCharacters());

    await act(async () => {
      const fakeResponse = {
        id: 1,
        name: 'Name',
        description: 'Desc',
        race: 'Race',
        alignment: 'NG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCharacter({
        id: 1,
        name: 'Name',
        description: 'Desc',
        race: 'Race',
        alignment: 'NG',
      });
    });

    expect(result.current.characters).toEqual([
      {
        id: 1,
        name: 'Name',
        description: 'Desc',
        race: 'Race',
        alignment: 'NG',
      },
    ]);
  });

  it('edits an existing character', async () => {
    const { result } = renderHook(() => useCharacters());

    await act(async () => {
      const fakeResponse = {
        id: 1,
        name: 'Name',
        description: 'Desc',
        race: 'Race',
        alignment: 'NG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCharacter({
        id: 1,
        name: 'Name',
        description: 'Desc',
        race: 'Race',
        alignment: 'NG',
      });
    });

    expect(result.current.characters).toEqual([
      {
        id: 1,
        name: 'Name',
        description: 'Desc',
        race: 'Race',
        alignment: 'NG',
      },
    ]);

    await act(async () => {
      const fakeResponse = {
        id: 1,
        name: 'New Name',
        description: 'New Desc',
        race: 'Race',
        alignment: 'LG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.editCharacter(1, {
        id: 1,
        name: 'New Name',
        description: 'New Desc',
        race: 'Race',
        alignment: 'LG',
      });
    });

    expect(result.current.characters).toEqual([
      {
        id: 1,
        name: 'New Name',
        description: 'New Desc',
        race: 'Race',
        alignment: 'LG',
      },
    ]);
  });

  it('edits only the selected character when there are many characters', async () => {
    const { result } = renderHook(() => useCharacters());

    await act(async () => {
      const fakeResponse = {
        id: 1,
        name: 'Name1',
        description: 'Desc1',
        race: 'Human',
        alignment: 'NG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCharacter({
        id: 1,
        name: 'Name1',
        description: 'Desc1',
        race: 'Human',
        alignment: 'NG',
      });
    });

    await act(async () => {
      const fakeResponse = {
        id: 2,
        name: 'Name2',
        description: 'Desc2',
        race: 'Dwarf',
        alignment: 'LG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCharacter({
        id: 2,
        name: 'Name2',
        description: 'Desc2',
        race: 'Dwarf',
        alignment: 'LG',
      });
    });

    await act(async () => {
      const fakeResponse = {
        id: 3,
        name: 'Name3',
        description: 'Desc3',
        race: 'Elf',
        alignment: 'NG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCharacter({
        id: 3,
        name: 'Name3',
        description: 'Desc3',
        race: 'Elf',
        alignment: 'NG',
      });
    });

    expect(result.current.characters).toEqual([
      {
        id: 1,
        name: 'Name1',
        description: 'Desc1',
        race: 'Human',
        alignment: 'NG',
      },
      {
        id: 2,
        name: 'Name2',
        description: 'Desc2',
        race: 'Dwarf',
        alignment: 'LG',
      },
      {
        id: 3,
        name: 'Name3',
        description: 'Desc3',
        race: 'Elf',
        alignment: 'NG',
      },
    ]);

    await act(async () => {
      const fakeResponse = {
        id: 2,
        name: 'New Name',
        description: 'New Desc',
        race: 'Dwarf',
        alignment: 'LN',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.editCharacter(2, {
        id: 2,
        name: 'New Name',
        description: 'New Desc',
        race: 'Dwarf',
        alignment: 'LN',
      });
    });

    expect(result.current.characters).toEqual([
      {
        id: 1,
        name: 'Name1',
        description: 'Desc1',
        race: 'Human',
        alignment: 'NG',
      },
      {
        id: 2,
        name: 'New Name',
        description: 'New Desc',
        race: 'Dwarf',
        alignment: 'LN',
      },
      {
        id: 3,
        name: 'Name3',
        description: 'Desc3',
        race: 'Elf',
        alignment: 'NG',
      },
    ]);
  });

  it('deletes a character', async () => {
    const { result } = renderHook(() => useCharacters());

    await act(async () => {
      const fakeResponse = {
        id: 1,
        name: 'Name1',
        description: 'Desc1',
        race: 'Human',
        alignment: 'NG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCharacter({
        id: 1,
        name: 'Name1',
        description: 'Desc1',
        race: 'Human',
        alignment: 'NG',
      });
    });

    await act(async () => {
      const fakeResponse = {
        id: 2,
        name: 'Name2',
        description: 'Desc2',
        race: 'Dwarf',
        alignment: 'LG',
      };
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.addCharacter({
        id: 2,
        name: 'Name2',
        description: 'Desc2',
        race: 'Dwarf',
        alignment: 'LG',
      });
    });

    await act(async () => {
      const fakeResponse = 1;
      const mRes = { json: jest.fn().mockResolvedValueOnce(fakeResponse) };
      const mockedFetch = jest.fn().mockResolvedValueOnce(mRes);
      global.fetch = mockedFetch;
      await result.current.deleteCharacter(1);
    });

    expect(result.current.characters).toEqual([
      {
        id: 2,
        name: 'Name2',
        description: 'Desc2',
        race: 'Dwarf',
        alignment: 'LG',
      },
    ]);
  });
});

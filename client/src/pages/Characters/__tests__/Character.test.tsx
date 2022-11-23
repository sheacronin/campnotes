import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Character from '../Character';

describe('Character component', () => {
  const CHARACTER = {
    id: 1,
    name: 'Name',
    description: 'Desc',
    race: 'Race',
    alignment: 'NG',
  };
  const deleteCharacter = jest.fn();
  const addCharacter = jest.fn();
  const editCharacter = jest.fn();

  it('renders correct heading', () => {
    render(
      <Character
        character={CHARACTER}
        deleteCharacter={deleteCharacter}
        addCharacter={addCharacter}
        editCharacter={editCharacter}
      />
    );
    expect(screen.getByRole('heading').textContent).toMatch(/Name/);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Character
        character={CHARACTER}
        deleteCharacter={deleteCharacter}
        addCharacter={addCharacter}
        editCharacter={editCharacter}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it('calls deleteCharacter after delete button click', () => {
    render(
      <Character
        character={CHARACTER}
        deleteCharacter={deleteCharacter}
        addCharacter={addCharacter}
        editCharacter={editCharacter}
      />
    );
    const deleteButton = screen.getByRole('button', { name: 'Delete' });
    userEvent.click(deleteButton);
    expect(deleteCharacter).toHaveBeenCalled();
  });
});

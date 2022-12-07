import { renderHook, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import useEditForm from '../useEditForm';

describe('useEditForm hook', () => {
  const addItem = jest.fn();
  const editItem = jest.fn();

  it('isEditiing state defaults to false', () => {
    const { result } = renderHook(() => useEditForm(addItem, editItem));

    expect(result.current.isEditing).toBe(false);
  });

  it('openEditForm function sets isEditing to true', () => {
    const { result } = renderHook(() => useEditForm(addItem, editItem));

    act(() => {
      result.current.openEditForm();
    });

    expect(result.current.isEditing).toBe(true);
  });

  it('closeEditForm function sets isEditing to false', () => {
    const { result } = renderHook(() => useEditForm(addItem, editItem));

    act(() => {
      result.current.openEditForm();
      result.current.closeEditForm();
    });

    expect(result.current.isEditing).toBe(false);
  });

  it('isEditing is set to false after onSubmitForm runs', () => {
    const { result } = renderHook(() => useEditForm(addItem, editItem));

    act(() => {
      result.current.openEditForm();
    });

    expect(result.current.isEditing).toBe(true);

    act(() => {
      const ITEM_ID = 1;
      const ITEM = { name: 'Name' };
      result.current.onSubmitForm(ITEM_ID, ITEM);
    });

    expect(result.current.isEditing).toBe(false);
  });

  it('edits an item on form submission if its id is not -1', () => {
    const { result } = renderHook(() => useEditForm(addItem, editItem));
    const ITEM_ID = 1;
    const ITEM = { name: 'Name' };

    act(() => {
      result.current.onSubmitForm(ITEM_ID, ITEM);
    });

    expect(editItem).toHaveBeenCalledWith(ITEM_ID, ITEM);
    expect(addItem).not.toHaveBeenCalled();
  });

  it('adds an item on form submission if its id is -1', () => {
    const { result } = renderHook(() => useEditForm(addItem, editItem));
    const ITEM_ID = -1;
    const ITEM = { name: 'Name' };

    act(() => {
      result.current.onSubmitForm(ITEM_ID, ITEM);
    });

    expect(addItem).toHaveBeenCalledWith(ITEM);
    expect(editItem).not.toHaveBeenCalled();
  });
});

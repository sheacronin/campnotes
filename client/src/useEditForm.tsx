import { useState } from 'react';

const useEditForm = (
  addItem: (item: any) => void,
  editItem: (itemId: number, item: any) => void
) => {
  const [isEditing, setIsEditing] = useState(false);

  const openEditForm = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };

  const onSubmitForm = (itemId: number, item: any) => {
    if (itemId === -1) {
      // If no item (set default id to -1), post new item
      addItem(item);
    } else {
      // Else, edit the exisiting item
      editItem(itemId, item);
    }
    setIsEditing(false);
  };

  return { isEditing, onSubmitForm, openEditForm, closeEditForm };
};

export default useEditForm;

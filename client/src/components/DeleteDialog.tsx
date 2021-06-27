import React, { Dispatch, Fragment, FunctionComponent } from "react";

interface DeleteDialogProps {
  id: number;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  deleteContact: (id: number) => void;
}

const DeleteDialog: FunctionComponent<DeleteDialogProps> = ({
  id,
  setOpen,
  deleteContact,
}) => {
  const handleCancelDelete = () => {
    setOpen(false);
  };

  const performDelete = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/contacts/${id}`, {
      method: "DELETE",
      mode: "cors",
    });

    deleteContact(id);
    setOpen(false);
  };

  return (
    <Fragment>
      <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex-shrink-0 flex items-center text-red-600 justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to delete this contact? This action cannot
                be undone.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          onClick={performDelete}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Delete
        </button>
        <button
          onClick={handleCancelDelete}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >
          Cancel
        </button>
      </div>
    </Fragment>
  );
};

export default DeleteDialog;

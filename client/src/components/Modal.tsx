import React, {
  Dispatch,
  Fragment,
  FunctionComponent,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import DeleteDialog from "./DeleteDialog";

interface ModalProps {
  contact: Contact | null;
  type: string;
  title: string;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  appendContactToList: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (id: number) => void;
}

const Modal: FunctionComponent<ModalProps> = ({
  contact,
  type,
  title,
  open,
  setOpen,
  appendContactToList,
  updateContact,
  deleteContact,
}) => {
  const cancelButtonRef = useRef(null);

  const renderBody = () => {
    switch (type) {
      case "create":
        return (
          <CreateForm
            setOpen={setOpen}
            appendContactToList={appendContactToList}
          />
        );

      case "edit":
        if (contact)
          return (
            <EditForm
              setOpen={setOpen}
              updateContact={updateContact}
              contact={contact}
            />
          );
      default:
        if (contact) {
          return (
            <DeleteDialog
              deleteContact={deleteContact}
              id={contact.id}
              setOpen={setOpen}
            />
          );
        }
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={open}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Dialog.Title
                  as="h3"
                  className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800"
                >
                  {title}
                </Dialog.Title>
                {renderBody()}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;

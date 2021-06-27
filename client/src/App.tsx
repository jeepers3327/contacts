import React, { useEffect, useState } from "react";
import ContactTable from "./components/ContactTable";
import NewContactModal from "./components/Modal";

function App() {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [type, setType] = useState("create");
  const [contact, setContact] = useState<Contact | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const contacts = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
        mode: "cors",
        headers: {
          "Content-Type": "application/son",
        },
      })
        .then((response) => response.json())
        .then(({ data }) => data);

      setContacts(contacts);
    };

    fetchContacts();
  }, []);

  const openCreateForm = () => {
    setModalTitle("Create new contact");
    setType("create");
    setContact(null);
    setOpen(true);
  };

  const openEditForm = (contact: Contact) => {
    setModalTitle("Edit contact");
    setType("edit");
    setContact(contact);
    setOpen(true);
  };

  const openDeleteDialog = (id: number) => {
    setModalTitle("Delete contact");
    setType("delete");
    setContact({
      id: id,
      name: "",
      phone_number: "",
      email: "",
    });
    setOpen(true);
  };

  const appendContactToList = (contact: Contact) => {
    setContacts((contacts) => [...contacts, contact]);
  };

  const updateContact = (contact: Contact) => {
    const updatedContacts = contacts.map((cont) => {
      if (cont.id === contact.id) {
        const updatedContact = Object.assign({}, cont, contact);
        return updatedContact;
      }

      return cont;
    });

    setContacts(updatedContacts);
  };

  const deleteContact = (id: number) => {
    const updatedContacts = contacts.filter((cont) => cont.id !== id);
    setContacts(updatedContacts);
  };

  return (
    <>
      <div className="max-w-7xl mt-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
          <div className="sm:flex items-center justify-between">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
              Contacts
            </p>
            <div>
              <button
                onClick={openCreateForm}
                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start text-sm font-medium leading-none text-white px-5 py-2 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>New Contact</span>
              </button>
            </div>
          </div>
        </div>
        <ContactTable
          contacts={contacts}
          openEditForm={openEditForm}
          openDeleteDialog={openDeleteDialog}
        />
        <NewContactModal
          deleteContact={deleteContact}
          updateContact={updateContact}
          appendContactToList={appendContactToList}
          type={type}
          contact={contact}
          title={modalTitle}
          open={open}
          setOpen={setOpen}
        />
      </div>
    </>
  );
}

export default App;

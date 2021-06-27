import React, {
  Dispatch,
  FormEvent,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";

interface EditFormProps {
  contact: Contact;
  setOpen: Dispatch<SetStateAction<boolean>>;
  updateContact: (contact: Contact) => void;
}

const EditForm: FunctionComponent<EditFormProps> = ({
  contact,
  setOpen,
  updateContact,
}) => {
  const [contactData, setContactData] = useState(contact);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { contact: contactData };
    const updateContactData = await fetch(
      `${import.meta.env.VITE_API_URL}/contacts/${contact.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    const result = await updateContactData.json();

    updateContact(result["data"] as Contact);
    setOpen(false);
  };

  return (
    <div className="md:grid">
      <div className="mt-5 md:mt-0 md:col-span-2">
        <form onSubmit={handleSubmit} action="#" method="POST">
          <div className="sm:rounded-md sm:overflow-hidden">
            <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    value={contactData.name}
                    onChange={(event) =>
                      setContactData({
                        ...contactData,
                        name: event.target.value,
                      })
                    }
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    placeholder="Your name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone_number"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    value={contactData.phone_number}
                    onChange={(event) =>
                      setContactData({
                        ...contactData,
                        phone_number: event.target.value,
                      })
                    }
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    placeholder="Your contact number"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    value={contactData.email}
                    onChange={(event) =>
                      setContactData({
                        ...contactData,
                        email: event.target.value,
                      })
                    }
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    placeholder="Your email address"
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;

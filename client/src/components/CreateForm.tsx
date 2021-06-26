import React, { Dispatch, FormEvent, FunctionComponent, useState } from "react";

interface CreateFormProps {
  appendContactToList: (contact: Contact) => void;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}

const CreateForm: FunctionComponent<CreateFormProps> = ({
  appendContactToList,
  setOpen,
}) => {
  const [contact, setContact] = useState<Omit<Contact, "id">>({
    email: "",
    name: "",
    phoneNumber: "",
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = { contact: contact };

    const submitData = await fetch(`${import.meta.env.VITE_API_URL}/contacts`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    const result: Contact = await submitData.json();

    appendContactToList(result);
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
                    required
                    type="text"
                    name="name"
                    id="name"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    placeholder="Your name"
                    onChange={(event) =>
                      setContact({
                        ...contact,
                        name: event.target.value,
                      })
                    }
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
                    required
                    type="text"
                    name="phone_number"
                    id="phone_number"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    placeholder="Your contact number"
                    onChange={(event) =>
                      setContact({
                        ...contact,
                        phoneNumber: event.target.value,
                      })
                    }
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
                    required
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    placeholder="Your email address"
                    onChange={(event) =>
                      setContact({
                        ...contact,
                        email: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;

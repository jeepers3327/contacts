defmodule ApiWeb.ContactView do
  use ApiWeb, :view
  alias ApiWeb.ContactView

  def render("index.json", %{contacts: contacts}) do
    %{data: render_many(contacts, ContactView, "contact.json")}
  end

  def render("show.json", %{contact: contact}) do
    %{data: render_one(contact, ContactView, "contact.json")}
  end

  def render("contact.json", %{contact: contact}) do
    %{id: contact.id,
      name: contact.name,
      phone_number: contact.phone_number,
      email: contact.email}
  end
end

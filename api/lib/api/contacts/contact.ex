defmodule Api.Contacts.Contact do
  use Ecto.Schema
  import Ecto.Changeset

  schema "contacts" do
    field :email, :string
    field :name, :string
    field :phone_number, :string

    timestamps()
  end

  @doc false
  def changeset(contact, attrs) do
    contact
    |> cast(attrs, [:name, :phone_number, :email])
    |> validate_required([:name, :phone_number, :email])
  end
end

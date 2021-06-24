defmodule Api.Repo.Migrations.CreateContacts do
  use Ecto.Migration

  def change do
    create table(:contacts) do
      add :name, :string, null: false
      add :phone_number, :string, null: false
      add :email, :string, null: false

      timestamps()
    end

  end
end

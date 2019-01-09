class AddItemsToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :street_and_number, :string
    add_column :users, :postalcode, :string
    add_column :users, :city, :string
    add_column :users, :phonenumber, :string
  end
end

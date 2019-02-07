class AddTextblocksToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :textblocks, :text, array: true, default: []
  end
end

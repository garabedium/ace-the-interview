class CreateLists < ActiveRecord::Migration[5.2]
  def change
    create_table :lists do |t|
      t.string :name, null: false
      t.belongs_to :user, null: false
      t.timestamps
    end
    add_index :lists, [:user_id, :name], unique: true
  end
end
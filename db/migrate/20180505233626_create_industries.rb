class CreateIndustries < ActiveRecord::Migration[5.2]
  def change
    create_table :industries do |t|
      t.string :name, null: false
    end
    add_index :industries, :name, unique: true
  end
end

class AddIndustryToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :industry, null: false
  end
end

class AddPublicColumnToQuestions < ActiveRecord::Migration[5.2]
  def change
    add_column :questions, :public, :boolean, null: false, default: true
  end
end

class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :title, null: false
      t.timestamps
    end
    add_index :questions, :title, unique: true
  end
end
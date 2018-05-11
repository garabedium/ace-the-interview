class CreateQuestionCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :question_categories do |t|
      t.belongs_to :question, null: false
      t.belongs_to :category, null: false
      t.timestamps
    end
  end
end
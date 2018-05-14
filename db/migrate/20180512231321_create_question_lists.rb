class CreateQuestionLists < ActiveRecord::Migration[5.2]
  def change
    create_table :question_lists do |t|
      t.belongs_to :list, null: false
      t.belongs_to :question, null: false
    end
  end
end
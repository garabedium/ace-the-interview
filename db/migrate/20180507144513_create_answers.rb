class CreateAnswers < ActiveRecord::Migration[5.2]
  def change
    create_table :answers do |t|
      t.belongs_to :user, null: false
      t.belongs_to :question, null: false
      t.text :body, null: false
      t.text :hint
    end
  end
end
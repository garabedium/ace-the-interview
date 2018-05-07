class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :title, null: false
<<<<<<< HEAD
      t.belongs_to :user, null: false
      t.timestamps
    end
=======
      t.timestamps
    end
    add_index :questions, :title, unique: true
>>>>>>> master
  end
end
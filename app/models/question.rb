class Question < ApplicationRecord
<<<<<<< HEAD
  belongs_to :user
  validates :title, presence: true
=======
  validates :title, presence: true, uniqueness: true
>>>>>>> master
end
class List < ApplicationRecord
  belongs_to :user
  validates :name, presence: true, uniqueness: { scope: :user }

  has_many :question_lists
  has_many :questions, through: :question_lists
end
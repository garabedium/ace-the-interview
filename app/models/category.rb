class Category < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :question_categories
  has_many :questions, through: :question_categories
end
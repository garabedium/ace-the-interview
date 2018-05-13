class Question < ApplicationRecord

  belongs_to :user
  has_many :answers

  has_many :question_categories
  has_many :categories, through: :question_categories

  has_many :question_lists
  has_many :lists, through: :question_lists

  validates :title, presence: true

end
class QuestionCategory < ApplicationRecord

  validates :category, presence: true
  validates :question, presence: true

  belongs_to :category
  belongs_to :question
end
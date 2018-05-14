class QuestionCategory < ApplicationRecord
  validates :question, presence: true
  validates :category, presence: true

  belongs_to :question
  belongs_to :category
end
class QuestionList < ApplicationRecord
  validates :question, presence: true
  validates :list, presence: true

  belongs_to :question
  belongs_to :list
end
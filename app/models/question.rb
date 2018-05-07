class Question < ApplicationRecord
  validates :title, presence: true, uniqueness: true
end
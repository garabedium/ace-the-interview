class QuestionSerializer < ActiveModel::Serializer
  attributes :title, :answers
end

def answers
  object.answers
end
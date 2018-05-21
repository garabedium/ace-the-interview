class QuestionSerializer < ActiveModel::Serializer
  attributes :id, :title, :categories, :answers

  def categories
    object.categories
  end

  def answers
    object.answers
  end

end

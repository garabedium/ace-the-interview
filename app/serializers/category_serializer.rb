class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :question_count

  def question_count
    object.questions.size
  end

end
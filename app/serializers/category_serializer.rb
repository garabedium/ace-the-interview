class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :question_count

  def question_count
    # question_size = object.questions.size
    # if question_size > 0
    # end
      object.questions.size
  end

end
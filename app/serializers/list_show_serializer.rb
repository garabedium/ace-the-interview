class ListShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :questions

  def questions
    list_questions = object.questions

    list_questions = list_questions.map do |item|
      {
        id: item.id,
        title: item.title,
        categories: item.categories,
        answer: item.answers.find_by(user: current_user)
      }
    end
  end

end
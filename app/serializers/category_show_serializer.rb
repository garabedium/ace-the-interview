class CategoryShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :questions

  def questions
    category_questions = object.questions

    category_questions = category_questions.map do |item|
      {
        id: item.id,
        title: item.title,
        categories: item.categories,
        answer: item.answers.find_by(user: current_user)
      }
    end
  end
end

class CategoryShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :questions_by_category

  def questions_by_category
    object.questions
  end
end

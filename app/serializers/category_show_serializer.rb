class CategoryShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :questions

  def questions
    # should be able to loop through and create custom object:
    object.questions
  end
end

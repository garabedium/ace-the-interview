class Api::V1::CategoriesController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index
    if params[:random]
      question = Category.find_by(id: params[:random]).questions.sample(1)[0]
      categories = question.categories
      answer = question.answers.find_by(user: current_user)

      render json: {
        question: question,
        answer: answer,
        categories: categories
      }
    else
      render json: Category.all.order(name: :asc)
    end
  end

  def show
    render json: Category.find(params[:id]), serializer: CategoryShowSerializer
  end


end
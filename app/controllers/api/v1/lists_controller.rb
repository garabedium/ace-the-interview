class Api::V1::ListsController < ApiController
  serialization_scope :current_user

  before_action :authorize_user

  def index

    lists = current_user.lists

    if params[:random]
      question = lists.find_by(id: params[:random]).questions.sample(1)[0]
      categories = question.categories
      answer = question.answers.find_by(user: current_user)

      render json: {
        question: question,
        answer: answer,
        categories: categories
      }
    else
      render json: lists
    end

  end

  def show
    lists = current_user.lists
    render json: lists.find(params[:id]), serializer: ListShowSerializer
  end

  # def new
  #   list = List.new
  # end

  def create
    list = List.new(list_params)
    list.user = current_user
    list.save

    # lists = current_user.lists

    # list_questions = lists.map do |list|
    #   {
    #     id: list[:id],
    #     name: list[:name],
    #     questions: list.questions
    #   }
    # end

    render json: {id: list.id, name: list.name}

  end

  private
  def list_params
    params.require(:list).permit(:name)
  end

end
